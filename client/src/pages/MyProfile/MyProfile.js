import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import Nav from '../../components/Nav/Nav';
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay';
import EditProfile from '../../components/EditProfile';
import EditAvailability from '../../components/EditAvailability/EditAvailability';
import EditSubjects from '../../components/EditSubjects/EditSubjects';
import { AuthContext } from '../../AuthContext';
import './MyProfile.css';

export default function MyProfile(props) {
  // get the userId and isTeacher from context
  let { userId, isTeacher } = useContext(AuthContext);
  // will need some state here to handle the editing capabilities
  const [userInfo, setUserInfo] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);
  const [reviews, setReviews] = useState([]);

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
        console.log(response.data);
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
        setReviews(data.Reviews);
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <Nav />
      <div className="columns my-profile-div">
        <div className="column is-narrow side-bar">
          <SideBarMenu />
        </div>
        <div className="column is-10 mt-5 font-style">
          <h1 className="title px-3">Welcome to your profile!</h1>
          <p className="subtitle is-6 px-3">You may edit or update your information here.  Other users can see this information if you are on their dashboard{ isTeacher ? <span> and it is how student will search for you</span>: null }, so keep it professional and up-to-date for best results.</p>
          <div className="container">
            <div className="level">
              <div className="level-left"></div>
              <div className="level-right">
                {editMode === 'off' &&
                editAvailabilityMode === 'off' &&
                editSubjectsMode === 'off' ? (
                  <button
                    className="level-item button is-small is-outlined is-pulled-right is-info"
                    onClick={() => setEditMode('on')}
                  >
                    Edit Profile
                  </button>
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
                reviews={reviews}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
