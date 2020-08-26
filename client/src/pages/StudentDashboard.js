import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Nav from '../components/Nav';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function ParentView(props) {
  const { userId, isTeacher } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);

  // This is temporary.... change this once we get the tutor-student assigning capabilities running
  useEffect(() => {
    if (userId) {
      Axios.get(`/api/myprofile/${userId}`).then((response) => {
        console.log(response);
        const data = response.data;
        setUserInfo({
          ...userInfo,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          isTeacher: data.isTeacher,
        });
        setUserProfileInfo(data.UserProfile);
        setSubjectsInfo(data.Subjects);
        setAvailabilityInfo(data.Availabilities);
      });
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="column">
          <h1 className="title">
            Hello {userInfo.firstName} {userInfo.lastName}!
          </h1>
          {isTeacher ? (
            <div>
              <p className="has-text-centered">
                Welcome to your Learning Link Dashboard! Looks like you
                currently do not have any students!
                <br />
                Now that you have an account, students and parents can reach out
                to you for tutoring services!  Be sure to regularly check your messages and your dashboard in case parents or students contact you for tutoring.
              </p>
            </div>
          ) : (
            <div>
              <p className="has-text-centered">Welcome to your Learning Link Dashboard! Looks like you
                currently do not have any tutors!
                <br/>
                To get started, search for tutors that meet your needs using the "Search for a Tutor" button in the menu.  From there, you'll be able to view tutors, add them to your dashboard, and send them a message.
                </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
