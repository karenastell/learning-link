import React from 'react';


export default function ProfileDisplay({
  userInfo,
  userProfileInfo,
  subjectsInfo,
  availabilityInfo,
  isTeacher,
}) {
  // we can have a put in here? Or up in the Myprofile page?


  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical is-5">
          <div className="tile is-vertical is-child box">
            <div className="tile">
              <p>
                Name: {userInfo.firstName} {userInfo.lastName}
              </p>
            </div>
            <div className="tile">
              <p>Email: {userInfo.email}</p>
            </div>
          </div>

          {isTeacher ? (
            <div className="tile is-child box">
              <dl className="block-list is-small is-outlined is-success is-centered">
                <h3>Days Available: </h3>
                {availabilityInfo.map((day) => (
                  <li key={day.day}>{day.day}</li>
                ))}
              </dl>
            </div>
          ) : null}
          {isTeacher === false ? (
            <div className="tile is-child box">
              <p>
                Special Education:{' '}
                {userProfileInfo.special_ed === true ? 'Yes' : 'No'}
              </p>
            </div>
          ) : null}
          {userProfileInfo.rate ? <p>Rate: ${userProfileInfo.rate}</p> : null}
        </div>
        <div className="tile is-parent">
          <div className="tile is-vertical box">
            <p className="tile">Bio: {userProfileInfo.bio}</p>
            {isTeacher ? (
              <p className="tile">Degree: {userProfileInfo.degree}</p>
            ) : null}
            {isTeacher === false ? (
              <p className="tile">Grade: {userProfileInfo.grade}</p>
            ) : null}
            {isTeacher === false ? (
              <p className="tile">School: {userProfileInfo.school}</p>
            ) : null}
            {isTeacher ? (
              <p className="tile">Experience: {userProfileInfo.experience}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical is-5">
          <div className="tile is-child box">
            <p>
              Location: {userProfileInfo.city}, {userProfileInfo.state}
            </p>
          </div>
          <div className="tile is-child box">
            <p>Delivery Method: {userProfileInfo.delivery_method}</p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <dl className="block-list is-small is-outlined is-success is-centered">
              <h3>Subjects for tutoring:</h3>
              {subjectsInfo.map((subject) => (
                <li key={subject.subject}>{subject.subject}</li>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
