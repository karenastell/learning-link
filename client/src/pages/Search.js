import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Delivery from '../components/Delivery';
import Address from '../components/Address';
import Availability from '../components/Availability';
import Subjects from '../components/Subjects';
import Nav from '../components/Nav';
import TutorSearchResult from '../components/TutorSearchResult';

export default function Search() {
  const [search, setSearch] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [days, setDays] = useState([]);
  const [check, setCheck] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [results, setResults] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);

  let responseArray = [];
  let responseData;
  

  const handleInputChange = (event) => {
    // some more info go here: https://reactjs.org/docs/forms.html#controlled-components
    const { name, value } = event.target;
    // use brackets to signify the name in the state
    setSearch({ ...search, [name]: value });
  };

  const handleCheckboxes = (event) => {
    const { value } = event.target;
    if (subjects.includes(value)) {
      const newArray = subjects.filter((subject) => subject !== value);
      setSubjects(newArray);
    } else {
      setSubjects([...subjects, value]);
    }
  };

  //   comment this function out to get Prettier to work
  const handleDaysCheckBoxes = (event) => {
    const { value } = event.target;
    if (check[value] === false) {
      // set the state to true
      // student is seeking tutoring on that day
      setCheck({ ...check, [value]: true });
      if (days.includes(value)) {
        setDays([...days]);
      } else {
        setDays([...days, value]);
      }
    } else {
      // set state to false
      // student is not seeking tutoring on that day
      setCheck({ ...check, [value]: false });
    }
  };

  const handleRemove = (value) => {
    // if the day is already in the days state array and it is unchecked, take it out of the state
    if (days.includes(value)) {
      const newArray = days.filter((day) => day !== value);
      setDays(newArray);
    }
  };

  const findATutor = async () => {

    if (days.length >= 1) {
      days.forEach(async (day) => {
        const response = await Axios.get(`api/search/day/${day}`);
        console.log('day: ', response.data);
        if (response.data.length >= 1) {
          response.data.forEach(async(tutor)=>{
            let dayArray = [];
            let subArray = [];
            await tutor.Availabilities.forEach((day)=>{
              dayArray.push(day.day)
              console.log(dayArray);
            })
            await tutor.Subjects.forEach((subject)=>{
              subArray.push(subject.subject)
              console.log(subArray);
            })
            responseData = {
              UserId: tutor.UserProfile.UserId,
              firstName: tutor.firstName,
              lastName: tutor.lastName,
              email: tutor.email,
              city: tutor.UserProfile.city,
              state: tutor.UserProfile.state,
              bio: tutor.UserProfile.bio,
              degree: tutor.UserProfile.degree,
              experience: tutor.UserProfile.experience,
              subject: subArray,
              day: dayArray,
              delivery_method: tutor.UserProfile.delivery_method,
              isTeacher: tutor.isTeacher,
            };
            responseArray.push(responseData);
          })
      
        } else {
          console.log('no responses for your day search');
        }

  
      });
    }

    if (subjects.length >= 1) {
      subjects.forEach(async (subject) => {
        const response2 = await Axios.get(`api/search/subject/${subject}`);
        console.log('subject: ', response2);

        if (response2.data.length >= 1) {
          response2.data.forEach(async(tutor)=>{
            let dayArray = [];
            let subArray = [];
            await tutor.Availabilities.forEach((day)=>{
              dayArray.push(day.day)
              console.log(dayArray);
            })
            await tutor.Subjects.forEach((subject)=>{
              subArray.push(subject.subject)
            })
            responseData = {
              UserId: tutor.UserProfile.UserId,
              firstName: tutor.firstName,
              lastName: tutor.lastName,
              email: tutor.email,
              city: tutor.UserProfile.city,
              state: tutor.UserProfile.state,
              bio: tutor.UserProfile.bio,
              degree: tutor.UserProfile.degree,
              experience: tutor.UserProfile.experience,
              subject: subArray,
              day: dayArray,
              delivery_method: tutor.UserProfile.delivery_method,
              isTeacher: tutor.isTeacher,
            };
            responseArray.push(responseData);
          })
      
        } else {
          console.log('no responses for your subject search');
        }
      });
    }

    if (search.delivery_method) {
      const response3 = await Axios.get(
        `api/search/delivery_method/${search.delivery_method}`
      );
      console.log('delivery: ', response3);

       if (response3.data.length >= 1) {
        response3.data.forEach(async(tutor)=>{
            let dayArray = [];
            let subArray = [];
            await tutor.Availabilities.forEach((day)=>{
              dayArray.push(day.day)
              console.log(dayArray);
            })
            await tutor.Subjects.forEach((subject)=>{
              subArray.push(subject.subject)
            })
            responseData = {
              UserId: tutor.UserProfile.UserId,
              firstName: tutor.firstName,
              lastName: tutor.lastName,
              email: tutor.email,
              city: tutor.UserProfile.city,
              state: tutor.UserProfile.state,
              bio: tutor.UserProfile.bio,
              degree: tutor.UserProfile.degree,
              experience: tutor.UserProfile.experience,
              subject: subArray,
              day: dayArray,
              delivery_method: tutor.UserProfile.delivery_method,
              isTeacher: tutor.isTeacher,
            };
            responseArray.push(responseData);
          })
      
        } else {
          console.log('no responses for your delivery method search');
        }

      
    }

    if (search.city && search.state) {
      const response4 = await Axios.get(
        `api/search/city/${search.city}/state/${search.state}`
      );
      console.log('city/state: ', response4);
      if (response4.data.length >= 1) {
        response4.data.forEach(async(tutor)=>{
          let dayArray = [];
          let subArray = [];
          await tutor.Availabilities.forEach((day)=>{
            dayArray.push(day.day)
            console.log(dayArray);
          })
          await tutor.Subjects.forEach((subject)=>{
            subArray.push(subject.subject)
          })
          responseData = {
            UserId: tutor.UserProfile.UserId,
            firstName: tutor.firstName,
            lastName: tutor.lastName,
            email: tutor.email,
            city: tutor.UserProfile.city,
            state: tutor.UserProfile.state,
            bio: tutor.UserProfile.bio,
            degree: tutor.UserProfile.degree,
            experience: tutor.UserProfile.experience,
            subject: subArray,
            day: dayArray,
            delivery_method: tutor.UserProfile.delivery_method,
            isTeacher: tutor.isTeacher,
          };
          responseArray.push(responseData);
        })
    
      } else {
        console.log('no responses for your location search');
      }

    }
    setResults(responseArray);
  };

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='container column'>
          <h1 className='title has-text-centered'>Search For a Tutor</h1>
          <h3 className='subtitle is-4 mt-5'>Choose Your Search Criteria:</h3>
          <Subjects handleCheckboxes={handleCheckboxes} />
          <Delivery handleInputChange={handleInputChange} />
          <Address handleInputChange={handleInputChange} />
          <Availability
            check={check}
            handleDaysCheckBoxes={handleDaysCheckBoxes}
            handleRemove={handleRemove}
          />
          <div className='field is-horizontal'>
            <div className='field-label'></div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <button onClick={findATutor} className='button is-primary'>
                    Find a Tutor
                  </button>
                </div>
              </div>
            </div>
          </div>
          <TutorSearchResult key={results.UserId} results={results} />
        </div>
      </div>
    </>
  );
}
