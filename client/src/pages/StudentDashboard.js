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
          { userInfo.isTeacher ? (
            <h1 className="title">
              Hello {userInfo.firstName} {userInfo.lastName}! Here are your
              current students:
            </h1>
          ) : (
            <h1 className="title">
              Hello {userInfo.firstName} {userInfo.lastName}! Here are your
              current tutors:
            </h1>
          )}

          <p>User id is {userId}</p>
        </div>
      </div>
    </>
  );
}
