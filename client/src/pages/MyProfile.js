import React, { useEffect, useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import { AuthContext } from '../AuthContext';

export default function MyProfile(props){
    // get the userId from context
    const { userId } = useContext(AuthContext);
    // will need some state here to handle the editing capabilities
    const [userInfo, setUserInfo] = useState({});
    const [userProfileInfo, setUserProfileInfo] = useState({});
    const [subjectsInfo, setSubjectsInfo] = useState([]);
    const [availabilityInfo, setAvailabilityInfo] = useState([]);

    const isTeacher = userInfo.isTeacher;

// const { id } = useParams()
console.log(userId, "this should be the id")
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
            setAvailabilityInfo(data.Availabilities)
        });  
        
    }, []);

    // Will need to have PUT requests to update items if the user makes edits.
    return (
        <>
        <SideBarMenu />
    <h1 className='title'>{userInfo.firstName} {userInfo.lastName}'s profile</h1>
        <div className='container mt-5 mb-5'>
            {/* Display each field from the database (obv not the password) */}
            {/* have an edit button after each item? or one edit button that allows all items to be editable? */}
            <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
            <p>Email: {userInfo.email}</p>
            <p>Bio: {userProfileInfo.bio}</p>
            <p>Location: {userProfileInfo.city}, {userProfileInfo.state}</p>
            { isTeacher ? <p>Degree: {userProfileInfo.degree}</p> : null}
            { isTeacher === false ? <p>Grade: {userProfileInfo.grade}</p> : null}
            { isTeacher === false ? <p>School: {userProfileInfo.school}</p> : null}
            { isTeacher ? <p>Experience: {userProfileInfo.experience}</p> : null}
            <p>Delivery Method: {userProfileInfo.delivery_method}</p>
            { isTeacher === false ? <p>Special Education: userProfileInfo.special_ed}</p> : null}
            { userProfileInfo.rate ? <p>Rate: ${userProfileInfo.rate}</p> : null}
            <div>
               <dl className="block-list is-small is-outlined is-success is-centered">
                <h3>Subjects for tutoring:</h3>
                {subjectsInfo.map(subject => <li key={subject.subject}>{subject.subject}</li>)}
            </dl> 
            </div>
            { isTeacher ? (
                <div>
                <dl className="block-list is-small is-outlined is-success is-centered">
                 <h3>Days Available: </h3>
                 {availabilityInfo.map(day => <li key={day.day}>{day.day}</li>)}
             </dl> 
             </div>
            ) : null}
            
        </div>
        </>
    )
}