import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserInfo from '../components/UserInfo/UserInfo';
import Address from '../components/Address';
import Bio from '../components/Bio';
import Subjects from '../components/Subjects';
import Delivery from '../components/Delivery';
import Axios from 'axios';

export default function StudentProfileForm(props) {
  const [formInfo, setFormInfo] = useState({});
  const [subjects, setSubjects] = useState([]);

  // These handle validation alert messages
  const [successAlert, setSuccessAlert] = useState('off');
  const [errorAlert, setErrorAlert] = useState('off');
  const [passwordAlert, setPasswordAlert] = useState('off');
  const [emailAlert, setEmailAlert] = useState('off');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // use brackets to signify the name in the state
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleCheckboxes = (event) => {
    setSubjects([...subjects, event.target.value]);
  };


  const history = useHistory();

  const onButtonSubmit = (event) => {
    event.preventDefault();
    // if any required fields are empty, display an alert
    if (
      !formInfo.firstName ||
      !formInfo.lastName ||
      !formInfo.email ||
      !formInfo.password ||
      !formInfo.bio ||
      !formInfo.grade ||
      !formInfo.school ||
      !formInfo.city ||
      !formInfo.state ||
      !formInfo.special_ed ||
      !formInfo.delivery_method ||
      !subjects[0]
    ) {
      setPasswordAlert('off')
      setErrorAlert('on');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    } else if (formInfo.password !== formInfo.confirmPassword) {
      setPasswordAlert('on');
      setErrorAlert('off')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      setErrorAlert('off');
      setPasswordAlert('off');
      postToDatabase();
    }
  };

  const postToDatabase = () => {
    Axios.post('/api/auth/signup-student', {
      firstName: formInfo.firstName,
      lastName: formInfo.lastName,
      email: formInfo.email,
      password: formInfo.password,
      bio: formInfo.bio,
      grade: formInfo.grade,
      school: formInfo.school,
      city: formInfo.city,
      state: formInfo.state,
      special_ed: formInfo.special_ed,
      subjects: subjects,
      delivery_method: formInfo.delivery_method,
      duration: formInfo.duration,
    }).then((response) => {
      if (response.data.name === 'SequelizeUniqueConstraintError') {
        setEmailAlert('on');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return
      }
      setSuccessAlert('on');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
       history.push('/');
       setSuccessAlert('off') 
      }, 3000);
      
    });
  }

  return (
    <div className='container mt-5 mb-5 font-style'>
      <h1 className='title'>Sign up as a Student</h1>
      {successAlert === 'on' ? (
                <article className="message is-primary">
                  <div className="message-body">
                    You have successfully Signed up!  Redirecting to the homepage.  Please login...
                  </div>
                </article>
              ) : errorAlert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">You are missing a required field! (Only the length of time is optional)</div>
                </article>
              ) : passwordAlert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">Your passwords do not match!</div>
                </article>
              ) : emailAlert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">That email already has an account.</div>
                </article>
              ) : null}
      <UserInfo handleInputChange={handleInputChange} formInfo={formInfo} />
      <Bio handleInputChange={handleInputChange} />

      <div className='field is-horizontal'>
        <div className='field-label is-normal'>
          <label className='label'>School Information *</label>
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
          <label className='label'>Special Education Services *</label>
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
              <button className='button is-info mb-6' onClick={onButtonSubmit}>
                Submit
              </button>
              <button
                className="button is-light mx-4"
                onClick={() => history.push('/')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
