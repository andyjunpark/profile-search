import ProfileList from './components/ProfileList';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] =useState([]);

  
  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students').then((response) => {
      response.data.students.forEach(student => {
        student.tags = [];
      })
      setProfile(response.data.students);
      console.log(response.data.students);
    }).catch(e => {
      console.log('error:', e)
    })
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newProfileList = profile.filter((profiles) => {
        return Object.values(profiles)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newProfileList);
    }
    else {
      setSearchResults(profile)
    }
  };

  return (
    <main>
      <ProfileList
      key={profile.id} 
      // if search is empty then pass profile, else pass search results
      profile={searchTerm.length < 1 ? profile : searchResults} 
      term={searchTerm}
      tag={searchTag}
      searchKeyword={searchHandler}
      />
    </main>
  );
}

export default App;
