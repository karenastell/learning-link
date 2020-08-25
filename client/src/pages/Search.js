import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Delivery from '../components/Delivery';
import Address from '../components/Address';
import Availability from '../components/Availability';
import Subjects from '../components/Subjects';
import TutorSearchResult from '../components/TutorSearchResult';

export default function Search(props) {
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
      if (check.[value] === false) {
          // set the state to true
          // student is seeking tutoring on that day
         setCheck({ ...check, [value]: true });
      if(days.includes(value)){
          setDays([...days])
      } else {
          setDays([...days, value])
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

  const findATutor = () => {
    if (days.length >= 1) {
      days.forEach((day) => {
        Axios.get(`api/search/day/${day}`).then((response) => {
          console.log('day: ', response);
          response.data.forEach((item) => {
            responseData = {
              id: item.id,
              day: item.day,
              firstName: item.firstName,
              lastName: item.lastName
            };
            responseArray.push(responseData);
          });
        });
      });
    }

    if (subjects.length >= 1) {
      subjects.forEach((subject) => {
        Axios.get(`api/search/subject/${subject}`).then((response) => {
          console.log('subject: ', response);
          response.data.forEach((item) => {
            responseData = {
              subject: item.subject,
              id: item.id,
            };
            responseArray.push(responseData);
          });
        });
      });
    }



    if (search.delivery_method) {
      Axios.get(`api/search/delivery_method/${search.delivery_method}`).then(
        (response) => {
          console.log('delivery: ', response);
          response.data.forEach((item) => {
            responseData = {
              id: item.id,
              delivery: item.delivery_method,
            };
            responseArray.push(responseData)
          });
        }
      );
    }

    if (search.city && search.state) {
      Axios.get(`api/search/city/${search.city}/state/${search.state}`).then(
        (response) => {
          console.log('city/state: ', response);
          response.data.forEach((item)=>{
                responseData = {
              id: item.id,
              city: item.city,
              state: item.state
          }
          responseArray.push(responseData);
          })
        
        }
      );
    }

    setResults([...results, responseArray]);
  };


  console.log(results, 'results');

  

  results.forEach((result) => {
    console.log(result.id);
  });










  return (
    <>
      <SideBarMenu />
      <div className='container'>
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
        <TutorSearchResult />
        {subjects.map((subject) => (
          <p>{subject}</p>
        ))}
        {results.map((tutor) => (
          <p>{tutor.id}</p>
        ))}
      </div>
    </>
  );
}
