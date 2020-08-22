import React, { useState } from 'react';
import UserInfo from '../components/UserInfo';
import Address from '../components/Address';
import Bio from '../components/Bio';
import Subjects from '../components/Subjects';
import Delivery from '../components/Delivery';
import Axios from 'axios';

export default function StudentProfileForm(props) {
  const [studentFormInfo, setStudentFormInfo] = useState({});
  const [subjects, setSubjects] = useState([]);

  const handleInputChange = (event) => {
    // some more info go here: https://reactjs.org/docs/forms.html#controlled-components
    const { name, value } = event.target;

    console.log(value, name);
    // use brackets to signify the name in the state
    setStudentFormInfo({ ...studentFormInfo, [name]: value });
  };

  const handleCheckboxes = (event) => {
    setSubjects([...subjects, event.target.value]);
  };

  console.log(studentFormInfo);

  const onButtonSubmit = (event) => {
    event.preventDefault();
    Axios.post('/api/auth/signup-student', {
      firstName: studentFormInfo.firstName,
      lastName: studentFormInfo.lastName,
      email: studentFormInfo.email,
      password: studentFormInfo.password,
      bio: studentFormInfo.bio,
      grade: studentFormInfo.grade,
      school: studentFormInfo.school,
      city: studentFormInfo.city,
      state: studentFormInfo.state,
      special_ed: studentFormInfo.special_ed,
      subjects: studentFormInfo.subjects,
      delivery_method: studentFormInfo.delivery_method,
      duration: studentFormInfo.duration,
    }).then((response) => {
      console.log(response, 'Sign Up Form Has Been Posted');
    });
  };

  return (
    <div className='container mt-5 mb-5'>
      <h1 className='title'>Student Form</h1>
      <UserInfo handleInputChange={handleInputChange} />
      <Bio handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>School Information</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                onChange={handleInputChange}
                className='input'
                id='grade'
                type='text'
                placeholder='Grade'
                name='grade'
              />
            </p>
          </div>
          <div className='field'>
            <p className='control is-expanded'>
              <input
                onChange={handleInputChange}
                className='input'
                id='school'
                type='text'
                placeholder='School'
                name='school'
              />
            </p>
          </div>
        </div>
      </div>

      <Address handleInputChange={handleInputChange} />
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>Special Education Services</label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <label className='checkbox mr-5'>
              <input
                onChange={handleInputChange}
                className='mr-2'
                id='sped-yes'
                value='true'
                type='radio'
                name='special_ed'
              />
              Yes
            </label>
            <label className='checkbox mr-5'>
              <input
                onChange={handleInputChange}
                className='mr-2'
                id='sped-no'
                value='false'
                type='radio'
                name='special_ed'
              />
              No
            </label>
          </div>
        </div>
      </div>
      <Subjects handleCheckboxes={handleCheckboxes} />
      <Delivery handleInputChange={handleInputChange} />
      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>
            Length of Time Tutoring is Needed (Optional)
          </label>
        </div>
        <div className='field-body'>
          <div className='field'>
            <p className='control is-expanded '>
              <input
                onChange={handleInputChange}
                className='input'
                id='duration'
                type='text'
                placeholder=''
                name='duration'
              />
            </p>
          </div>
        </div>
      </div>
      <div className='field is-horizontal'>
        <div className='field-label'></div>
        <div className='field-body'>
          <div className='field'>
            <div className='control'>
              <button className='button is-primary' onClick={onButtonSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
