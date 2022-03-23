import React, {useRef} from "react";
import "./ProfileList.css";

export default function ProfileList(props) {
  const inputEl = useRef("");

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
  const profileList = profile.map(profiles => {
    return (
      <div className="profile">
        <img 
          src={profiles.pic} 
          alt="profile" 
        />
        <div key={profiles.id}>
          <h1>{profiles.firstName.toUpperCase()} {profiles.lastName.toUpperCase()}</h1>
          <ul>
            <li>{profiles.email}</li>
            <li>{profiles.company}</li>
            <li>{profiles.skill}</li>
            <li>{getAverageGrades(profiles.grades)}%</li>
          </ul>
          <ul>
            {
              profiles.grades.map((grade, index) => {
                return (
                  <li>Test {index+1}: &nbsp; &nbsp; {grade}%</li>
                )
              })
            }
          </ul>
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
          className="prompt" 
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