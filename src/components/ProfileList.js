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
      <div key={profiles.id}>
        <img src={profiles.pic} alt="profile"/>
        <h1>{profiles.firstName.toUpperCase()} {profiles.lastName.toUpperCase()}</h1>
        <h2>{profiles.email}</h2>
        <h2>{profiles.company}</h2>
        <h2>{profiles.skill}</h2>
        <h2>{getAverageGrades(profiles.grades)}</h2>
        <ul>
          {
            profiles.grades.map(grade => {
              return (
                <li>{grade}</li>
              )
            })
          }
        </ul>
      </div>
    )
  })
  
  return (
    <>
      <div>
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
      <div>
        {
          profileList.length > 0
            ? profileList
            : "No Profiles available"
        }
      </div>
    </>
  );
}