import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Delivery from './Delivery';
import Bio from './Bio';
import Address from './Address';
import Axios from 'axios';

export default function ProfileDisplay({
  userInfo,
  isTeacher,
  userProfileInfo,
  subjectsInfo,
  availabilityInfo,
  setEditMode,
  setUserInfo,
  setUserProfileInfo,
  userId,
}) {

  const [alert, setAlert] = useState('off');

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfileInfoChange = (event) => {
    const { name, value } = event.target;
    setUserProfileInfo({ ...userProfileInfo, [name]: value });
  };

  const history = useHistory();

  const handleSaveChanges = () => {
    if (isTeacher) {
      if (
        !userInfo.firstName ||
        !userInfo.lastName ||
        !userInfo.email ||
        !userProfileInfo.bio ||
        !userProfileInfo.experience ||
        !userProfileInfo.city ||
        !userProfileInfo.state ||
        !userProfileInfo.degree
      ) {
        setAlert('on');
        return;
      } else {
        setAlert('off');
        updateDatabase();
      }
    } else {
      if (
        !userInfo.firstName ||
        !userInfo.lastName ||
        !userInfo.email ||
        !userProfileInfo.bio ||
        !userProfileInfo.school ||
        !userProfileInfo.city ||
        !userProfileInfo.state ||
        !userProfileInfo.grade
      ) {
        setAlert('on');
        return;
      } else {
        setAlert('off');
        updateDatabase();
      }
    }
  };

  const updateDatabase = () => {
    Axios.put(`/api/edit-profile/${userId}`, {
      user: userInfo,
      userProfile: userProfileInfo,
    }).then(() => {});
    setEditMode('off');
    history.push('/updatemessage');
  };

  return (
    <>
      <h1>Edit profile page</h1>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Your Information</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input
                className="input"
                id="first-name"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleUserInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input
                className="input"
                id="last-name"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleUserInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control is-expanded has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                value={userInfo.email}
                onChange={handleUserInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right"></span>
            </p>
          </div>
        </div>
      </div>
      <Bio
        bio={userProfileInfo.bio}
        handleProfileInfoChange={handleProfileInfoChange}
      />
      <Address
        city={userProfileInfo.city}
        state={userProfileInfo.state}
        handleProfileInfoChange={handleProfileInfoChange}
      />
      {isTeacher ? (
        <>
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
                    value={userProfileInfo.degree}
                    onChange={handleProfileInfoChange}
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
                    value={userProfileInfo.experience}
                    onChange={handleProfileInfoChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
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
                    onChange={handleProfileInfoChange}
                    value={userProfileInfo.rate}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">School Information</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input
                  onChange={handleProfileInfoChange}
                  className="input"
                  id="grade"
                  type="text"
                  placeholder="Grade"
                  name="grade"
                  value={userProfileInfo.grade}
                />
              </p>
            </div>
            <div className="field">
              <p className="control is-expanded">
                <input
                  onChange={handleProfileInfoChange}
                  className="input"
                  id="school"
                  type="text"
                  placeholder="School"
                  name="school"
                  value={userProfileInfo.school}
                />
              </p>
            </div>
          </div>
        </div>
      )}
      <Delivery handleProfileInfoChange={handleProfileInfoChange} />
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              {alert === 'on' ? (
                <article class="message is-danger">
                  <div class="message-body">
                    You are missing a required field!
                  </div>
                </article>
              ) : null}
              <button className="button is-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button
                className="button is-light mx-4"
                onClick={() => setEditMode('off')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
