import React, { useEffect, useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import ProfileDisplay from '../components/ProfileDisplay';
import EditProfile from '../components/EditProfile';
import EditAvailability from '../components/EditAvailability';
import EditSubjects from '../components/EditSubjects';
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

  const [editAvailabilityMode, setEditAvailabilityMode] = useState('off');

  const [editSubjectsMode, setEditSubjectsMode] = useState('off');

  const isTeacher = userInfo.isTeacher;

  // TODO: GET rid of this once you have this page styled and set this page back to a private route!
  console.log(userId, 'this should be the id');
  // will need to get the user's profile data from the database
  useEffect(() => {
    console.log(userId, 'this is the userId inside the useeffect');
    getUserInfo();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [editMode, editAvailabilityMode, editSubjectsMode]);

  const getUserInfo = () => {
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
  };

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
            {editMode === 'off' ? (
              <a className="level-item" onClick={() => setEditMode('on')}>
                Edit Profile
              </a>
            ) : null}
          </div>
        </div>
        {editMode === 'on' ? (
          <EditProfile
            userInfo={userInfo}
            userProfileInfo={userProfileInfo}
            subjectsInfo={subjectsInfo}
            availabilityInfo={availabilityInfo}
            isTeacher={isTeacher}
            setEditMode={setEditMode}
            setUserInfo={setUserInfo}
            setUserProfileInfo={setUserProfileInfo}
            userId={userId}
          />
        ) : editAvailabilityMode === 'on' ? (
          <EditAvailability setEditAvailabilityMode={setEditAvailabilityMode} />
        ) : editSubjectsMode === 'on' ? (
          <EditSubjects setEditSubjectsMode={setEditSubjectsMode} />
        ) : (
          <ProfileDisplay
            userInfo={userInfo}
            userProfileInfo={userProfileInfo}
            subjectsInfo={subjectsInfo}
            availabilityInfo={availabilityInfo}
            isTeacher={isTeacher}
            setEditAvailabilityMode={setEditAvailabilityMode}
            setEditSubjectsMode={setEditSubjectsMode}
          />
        )}
      </div>
    </>
  );
}
