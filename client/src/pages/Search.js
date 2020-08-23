import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Delivery from '../components/Delivery';
import Address from '../components/Address';
import Availability from '../components/Availability';
import Subjects from '../components/Subjects';

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

  useEffect(()=>{
console.log('effect effected');
// checkIfFalse()
  },)

  const handleInputChange = (event) => {
    // some more info go here: https://reactjs.org/docs/forms.html#controlled-components
    const { name, value } = event.target;
    // use brackets to signify the name in the state
    setSearch({ ...search, [name]: value });
  };

  const handleCheckboxes = (event) => {
    console.log(event);
    setSubjects([...subjects, event.target.value]);
  };

  const handleDaysCheckBoxes = (event) => {
    const { value } = event.target;
    console.log(value);
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


  const handleRemove=(value)=>{
      // if the day is already in the array
      if(days.includes(value)){
          const newArray = days.filter((day)=>day !==value)
          setDays(newArray)
      }
  }
  


  const findATutor = () => {
    console.log(days);

    console.log(subjects);

    let searchUrl = '';
    if (search.city && search.state) {
      searchUrl = `city/${search.city}/state/${search.state}`;
    }
    if (search.delivery_method) {
      searchUrl = `${searchUrl}/delivery/${search.delivery_method}`;
    }
    if (subjects) {
      subjects.forEach((subject) => {
        searchUrl = `${searchUrl}/subject/${subject}`;
      });
    }
    if (days) {
      searchUrl = `${searchUrl}/days/`;
      if (days.length > 1) {
        days.forEach((day) => {
          searchUrl = `${searchUrl}${day}&`;
        });
      } else
        days.forEach((day) => {
          searchUrl = `${searchUrl}${day}`;
        });
    }

    console.log(searchUrl);
  };

  findATutor();

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
                <button className='button is-primary'>Find a Tutor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
