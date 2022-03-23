import React, {useRef} from "react";
import { useState } from "react";
import { FiPlus, FiMinus } from 'react-icons/fi'
import "./ProfileList.css";

export default function ProfileList(props) {
  const [clicked, setClicked] = useState(false);
  const inputEl = useRef("");

  const toggle = index => {
    if(clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  }

  // returns the average score of grades
  const getAverageGrades = (grades) => {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseInt( grades[i], 10);
    }
    return sum/grades.length
  }

  // returns the search terms
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
    // to see input values
    // console.log(inputEl.current.value);
  }

  // use props
  const profile = props.profile;
  const term = props.searchTerm;

  // populate profiles
  const profileList = profile.map((profiles, index) => {
    return (
      <div className="profile">
        <img 
          src={profiles.pic} 
          alt="profile" 
        />
        <div className="profile-info" key={profiles.id}>
          <h1>{profiles.firstName.toUpperCase()} {profiles.lastName.toUpperCase()}</h1>
          <ul>
            <li>Email: {profiles.email}</li>
            <li>Company: {profiles.company}</li>
            <li>Skill: {profiles.skill}</li>
            <li>Average {getAverageGrades(profiles.grades)}%</li>
          </ul>
          <ul>
            { 
              clicked === index 
                ? ( profiles.grades.map((grade, index) => {
                    return (
                      <li>Test {index+1}: &nbsp; &nbsp; {grade}%</li>
                    )
                  })) 
                : null
            }
          </ul>
        </div>
        <div className="icons" onClick={() => toggle(index)} key={index}>
          <span>
            {
              clicked === index 
                ? <FiMinus size={40} 
                onMouseOver={({target})=>target.style.color="black"}
                onMouseOut={({target})=>target.style.color="grey"}/> 
                : <FiPlus size={40}
                />
            }
          </span>
        </div>
      </div>
    )
  })
  
  return (
    <div className="wrapper">
      <div className="search-bar">
        <input 
          ref={inputEl}
          type="text" 
          placeholder="Search by name" 
          value={term} 
          onChange={getSearchTerm}
        >
        </input>
      </div>
      <div className="profile-container">
        <div className="profile-list">
          {
            profileList.length > 0
              ? profileList
              : "No Profiles available"
          }
        </div>
      </div>
    </div>
  );
}