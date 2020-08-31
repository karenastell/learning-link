import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Address from '../components/Address';
import Subjects from '../components/Subjects';
import UserInfo from '../components/UserInfo';
import Bio from '../components/Bio';
import Delivery from '../components/Delivery';
import Axios from 'axios';

export default function ProfileForm(props) {
  const [tutorFormInfo, setTutorFormInfo] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [days, setDays] = useState([]);

  // These handle validation alerts
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

  const history = useHistory();

  const tutorOnButtonSubmit = (event) => {
    event.preventDefault();
    // if any required fields are empty, display an alert
    if (
      !tutorFormInfo.firstName ||
      !tutorFormInfo.lastName ||
      !tutorFormInfo.email ||
      !tutorFormInfo.password ||
      !tutorFormInfo.bio ||
      !tutorFormInfo.degree ||
      !tutorFormInfo.experience ||
      !tutorFormInfo.delivery_method ||
      !tutorFormInfo.city ||
      !tutorFormInfo.state ||
      !subjects[0] ||
      !days[0]
    ) {
      setPasswordAlert('off')
      setErrorAlert('on');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    } else if (tutorFormInfo.password !== tutorFormInfo.confirmPassword) {
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
      console.log(response.data, 'This is the response!');
      // do we need a redirect?
      // If there is an error because of an existing email address, display email alert and return.
      if (response.data.name === 'SequelizeUniqueConstraintError') {
        setEmailAlert('on');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return
      }
      // if successful post, display success message and then redirect
      setSuccessAlert('on');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        history.push('/');
        setSuccessAlert('off');
      }, 3000);
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="title">Tutor Form</h1>
      {successAlert === 'on' ? (
        <article className="message is-primary">
          <div className="message-body">
            You have successfully Signed up! Redirecting to the homepage. Please
            login...
          </div>
        </article>
      ) : errorAlert === 'on' ? (
        <article className="message is-danger">
          <div className="message-body">You are missing a required field! (Only the rate is optional)</div>
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
      <UserInfo handleInputChange={handleInputChange} />

      <Bio handleInputChange={handleInputChange} />

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Education</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                id="credientials"
                placeholder="Degree(s)"
                name="degree"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                id="experience"
                placeholder="Experience"
                name="experience"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <Subjects handleCheckboxes={handleCheckboxes} />

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Availability</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="sunday"
                  value="Sunday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Sunday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="monday"
                  value="Monday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Monday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="tuesday"
                  value="Tuesday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Tuesday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="wednesday"
                  value="Wednesday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Wednesday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="thursday"
                  value="Thursday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Thursday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="friday"
                  value="Friday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Friday
              </label>
              <label className="checkbox mr-5">
                <input
                  className="mr-2"
                  id="saturday"
                  value="Saturday"
                  type="checkbox"
                  name="day"
                  onChange={handleDayCheckboxes}
                />
                Saturday
              </label>
            </div>
          </div>
        </div>
      </div>

      <Delivery handleInputChange={handleInputChange} />

      <Address handleInputChange={handleInputChange} />

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Rate per Hour (optional)</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                type="number"
                name="rate"
                className=""
                placeholder="$"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button
                className="button is-primary"
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
