import React, { useState } from 'react';
import Address from '../components/Address';
import Subjects from '../components/Subjects';
import UserInfo from '../components/UserInfo';
import Bio from '../components/Bio';
import Delivery from '../components/Delivery';
import Availability from '../components/Availability';
import Axios from 'axios';

export default function ProfileForm(props) {
  const [tutorFormInfo, setTutorFormInfo] = useState({});

  const [subjects, setSubjects] = useState([]);

  const [days, setDays] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorFormInfo({
      ...tutorFormInfo,
      [name]: value,
    });
  };

  const handleCheckboxes = (event) => {
    setSubjects([...subjects, event.target.value]);
  };

  const handleDayCheckboxes = (event) => {
    setDays([...days, event.target.value]);
  };

  const tutorOnButtonSubmit = (event) => {
    // for now, we'll put event.preventDefault(), but eventually we will redirect the user
    event.preventDefault();
    Axios.post('/api/auth/signup-tutor', {
      firstName: tutorFormInfo.firstName,
      lastName: tutorFormInfo.lastName,
      email: tutorFormInfo.email,
      password: tutorFormInfo.password,
      bio: tutorFormInfo.bio,
      degree: tutorFormInfo.degree,
      experience: tutorFormInfo.experience,
      delivery_method: tutorFormInfo.delivery_method,
      city: tutorFormInfo.city,
      state: tutorFormInfo.state,
      // these last 2 are arrays
      subjects: subjects,
      days: days,
    }).then((response) => {
      console.log(response);
      // TODO: then redirect
    });
  };

  return (
    <div className='container mt-5 mb-5'>
      <h1 className='title'>Tutor Form</h1>
      <UserInfo handleInputChange={handleInputChange} />

      <Bio handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Education</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='credientials'
                placeholder='Degree(s)'
                name='degree'
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <textarea
                className='textarea'
                id='experience'
                placeholder='Experience'
                name='experience'
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <Subjects handleCheckboxes={handleCheckboxes} />

      <Availability handleCheckBoxes={handleCheckboxes} />

      <Delivery handleInputChange={handleInputChange} />

      <Address handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Rate per Hour (optional)</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <input
                type='number'
                name='rate'
                className=''
                placeholder='$'
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className='field is-horizontal'>
        <div className='field-label'></div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <button
                className='button is-primary'
                onClick={tutorOnButtonSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
