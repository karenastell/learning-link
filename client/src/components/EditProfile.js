import React, { useContext, useState } from 'react';
import Subjects from './Subjects';
import Delivery from './Delivery';
import Availability from './Availability';
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
  console.log(subjectsInfo);
  console.log(availabilityInfo);
  console.log(userProfileInfo);

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfileInfoChange = (event) => {
    const { name, value } = event.target;
    setUserProfileInfo({...userProfileInfo, [name]: value});
  };

  const handleSaveChanges = () => {
    Axios.put(`/api/edit-profile/${userId}`, {user: userInfo, userProfile: userProfileInfo}).then(() => {});
    setEditMode('off')
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
      <Bio bio={userProfileInfo.bio} handleProfileInfoChange={handleProfileInfoChange} />
      <Address city={userProfileInfo.city} state={userProfileInfo.state} />
      {isTeacher ? (
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
      ) : null}
      <Delivery handleProfileInfoChange={handleProfileInfoChange}/>
      {isTeacher ? <Availability /> : null}
      <Subjects />
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button
                className="button is-primary"
                // onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="button is-light mx-4"
                // onClick={handleCancelChanges or redirect}
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
