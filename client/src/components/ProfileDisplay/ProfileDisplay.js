import React from 'react';
import './ProfileDisplay.css';


export default function ProfileDisplay({
  userInfo,
  userProfileInfo,
  subjectsInfo,
  availabilityInfo,
  isTeacher,
  setEditAvailabilityMode,
  setEditSubjectsMode,
  getUserInfo
}) {
  


  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical is-5">
          <div className="tile is-vertical is-child box box-style">
            <div className="tile">
              <p className="profile-text">
                <span className="profile-span">Name: </span>{userInfo.firstName} {userInfo.lastName}
              </p>
            </div>
            <div className="tile">
              <p className="profile-text"><span className="profile-span">Email: </span>{userInfo.email}</p>
            </div>
            { isTeacher && userProfileInfo.rate !== null && userProfileInfo.rate !== '' ? (
              <div className="tile">
              <p className="profile-text"><span className="profile-span">Rate: </span>${userProfileInfo.rate}</p>
            </div>
            ) : null}
          </div>

          {isTeacher ? (
            <div className="tile is-child box box-style">
              <dl className="block-list is-small is-outlined is-success is-centered">
                <h3 className="profile-text profile-span">Days Available: </h3>
                {availabilityInfo.map((day) => (
                  <li key={day.day} className="profile-text">{day.day}</li>
                ))}
              </dl>
              <a className="button is-outlined is-small is-pulled-right is-info" onClick={() => setEditAvailabilityMode('on')}>Edit Availability</a>
            </div>
          ) : null}
          {isTeacher === false ? (
            <div className="tile is-child box box-style">
              <p className="profile-text">
              <span className="profile-span">
                Special Education: </span>
                {userProfileInfo.special_ed === true ? 'Yes' : 'No'}
              </p>
            </div>
          ) : null}
        </div>
        <div className="tile is-parent">
          <div className="tile is-vertical box box-style">
            <p className="tile profile-text"><span className="profile-span">Bio: </span>{userProfileInfo.bio}</p>
            {isTeacher ? (
              <p className="tile profile-text"><span className="profile-span">Degree: </span>{userProfileInfo.degree}</p>
            ) : null}
            {isTeacher === false ? (
              <p className="tile profile-text"><span className="profile-span">Grade: </span>{userProfileInfo.grade}</p>
            ) : null}
            {isTeacher === false ? (
              <p className="tile profile-text"><span className="profile-span">School: </span>{userProfileInfo.school}</p>
            ) : null}
            {isTeacher ? (
              <p className="tile profile-text"><span className="profile-span">Experience: </span>{userProfileInfo.experience}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical is-5">
          <div className="tile is-child box box-style">
            <p className="profile-text">
            <span className="profile-span">Location: </span>{userProfileInfo.city}, {userProfileInfo.state}
            </p>
          </div>
          <div className="tile is-child box box-style">
            <p className="profile-text"><span className="profile-span">Delivery Method: </span>{userProfileInfo.delivery_method}</p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box box-style">
            <dl className="block-list is-small is-outlined is-success is-centered">
              <h3 className="profile-text"><span className="profile-span">Subjects for tutoring:</span></h3>
              {subjectsInfo.map((subject) => (
                <li key={subject.subject} className="profile-text">{subject.subject}</li>
              ))}
            </dl>
            <a className="button is-small is-pulled-right is-outlined is-info" onClick={() => setEditSubjectsMode('on')}>Edit Subjects</a>
          </div>
        </div>
      </div>
    </>
  );
}
