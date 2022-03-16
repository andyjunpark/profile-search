import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileList(props) {
  const [profile, setProfile] = useState('');
  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students').then((response) => {
      setProfile(response.data.students);
      console.log(response.data.students);
    }).catch(e => {
      console.log('error:', e)
    })
  }, [])
  
  const getAverageGrades = (grades) => {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseInt( grades[i], 10);
    }
    return sum/grades.length
  }
  return (
    <ul>
      {
        profile.map((profiles,index) => {
          return (
            <>
              <img src={profiles.pic}/>
              <h1>{profiles.firstName} {profiles.lastName}</h1>
              <ul>
                <li>{profiles.email}</li>
                <li>{profiles.company}</li>
                <li>{profiles.skill}</li>
                <li>{getAverageGrades(profiles.grades)}</li>
              </ul>
            </>
          )
        })
      }
    </ul>
  );
}