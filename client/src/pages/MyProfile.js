import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Nav from '../components/Nav/Nav';
import ProfileDisplay from '../components/ProfileDisplay/ProfileDisplay';
import EditProfile from '../components/EditProfile';
import EditAvailability from '../components/EditAvailability';
import EditSubjects from '../components/EditSubjects';
import { AuthContext } from '../AuthContext';


export default function MyProfile(props) {
  // get the userId and isTeacher from context
  let { userId, isTeacher } = useContext(AuthContext);
  // will need some state here to handle the editing capabilities
  const [userInfo, setUserInfo] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);

  // These control the conditional rendering of the various editable compontents
  const [editMode, setEditMode] = useState('off');
  const [editAvailabilityMode, setEditAvailabilityMode] = useState('off');
  const [editSubjectsMode, setEditSubjectsMode] = useState('off');

  //  get the user's profile data from the database when the page loads
  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, []);

  //
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

  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="column is-10 mt-4">
          <h1 className="title">
            {userInfo.firstName} {userInfo.lastName}'s profile
          </h1>
          <div className="container">
            <div className="level">
              <div className="level-left"></div>
              <div className="level-right">
                {editMode === 'off' ? (
                  <a
                    className="level-item button is-small is-outlined is-pulled-right is-info"
                    onClick={() => setEditMode('on')}
                  >
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
                getUserInfo={getUserInfo}
              />
            ) : editAvailabilityMode === 'on' ? (
              <EditAvailability
                setEditAvailabilityMode={setEditAvailabilityMode}
                isTeacher={isTeacher}
                getUserInfo={getUserInfo}
              />
            ) : editSubjectsMode === 'on' ? (
              <EditSubjects
                setEditSubjectsMode={setEditSubjectsMode}
                isTeacher={isTeacher}
                getUserInfo={getUserInfo}
              />
            ) : (
              <ProfileDisplay
                userInfo={userInfo}
                userProfileInfo={userProfileInfo}
                subjectsInfo={subjectsInfo}
                availabilityInfo={availabilityInfo}
                isTeacher={isTeacher}
                setEditAvailabilityMode={setEditAvailabilityMode}
                setEditSubjectsMode={setEditSubjectsMode}
                getUserInfo={getUserInfo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
