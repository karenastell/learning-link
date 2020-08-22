import React, { useEffect, useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import ProfileDisplay from '../components/ProfileDisplay';
import EditProfile from '../components/EditProfile';
import { AuthContext } from '../AuthContext';

export default function MyProfile(props) {
  // get the userId from context
  let { userId } = useContext(AuthContext);
  // will need some state here to handle the editing capabilities
  const [userInfo, setUserInfo] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);

  const [editMode, setEditMode] = useState('off');

  const isTeacher = userInfo.isTeacher;

  // TODO: GET rid of this once you have this page styled and set this page back to a private route!
  userId = 3;
  // const { id } = useParams()
  console.log(userId, 'this should be the id');
  // will need to get the user's profile data from the database
  useEffect(() => {
    console.log(userId, 'this is the userId inside the useeffect');
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
  }, []);

  // Will need to have PUT requests to update items if the user makes edits.
  return (
    <>
      <SideBarMenu />
      <h1 className="title">
        {userInfo.firstName} {userInfo.lastName}'s profile
      </h1>
      <div className="container">
        <div className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <a className="level-item" onClick={() => setEditMode('on')}>
              Edit Profile
            </a>
          </div>
        </div>
        {editMode === 'off' ? (
          <ProfileDisplay
            userInfo={userInfo}
            userProfileInfo={userProfileInfo}
            subjectsInfo={subjectsInfo}
            availabilityInfo={availabilityInfo}
            isTeacher={isTeacher}
          />
        ) : (
          <EditProfile />
        )}
      </div>
    </>
  );
}
