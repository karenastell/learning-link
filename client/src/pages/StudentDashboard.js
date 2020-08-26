import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Nav from '../components/Nav';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import DashboardCard from '../components/DashboardCards';

export default function ParentView(props) {
  const { userId, isTeacher } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  const [userInfo, setUserInfo] = useState({});
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [subjectsInfo, setSubjectsInfo] = useState([]);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserInfo();
      getMyStudentsOrTutors();
    }
  }, []);

  useEffect(() => {
    renderDashboardCard()
  }, [results])

  const getUserInfo = () => {
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
  };

     const myPeepsArray = [];
        let responseData;

  const getMyStudentsOrTutors = async () => {
 

    // Get the student-tutor pairs from the TutorStudent table
    const tutorStudentPairs = await Axios.get(`/api/mydashboard/${userId}`);

    await console.log(
      tutorStudentPairs.data,
      'these are the tutor student pairs'
    );

    // if isTeacher, get the studentIds and do a get for all users with those ids
    if (isTeacher) {
      
      // forEach studentId in the response...
      await tutorStudentPairs.data.forEach(async (entry) => {
        
        let studentId = entry.StudentId;
        let studentUserInfo = await Axios.get(
          `/api/mydashboard/mypeeps/${studentId}`
        );
        let dayArray = [];
        let subjectArray = [];
         studentUserInfo.data.Subjects.forEach((subject) => {
          subjectArray.push(subject.subject);
        });


        responseData = {
          firstName: studentUserInfo.data.firstName,
          lastName: studentUserInfo.data.lastName,
          email: studentUserInfo.data.email,
          city: studentUserInfo.data.UserProfile.city,
          state: studentUserInfo.data.UserProfile.state,
          bio: studentUserInfo.data.UserProfile.bio,
          degree: studentUserInfo.data.UserProfile.degree,
          experience: studentUserInfo.data.UserProfile.experience,
          subjects: subjectArray,
          delivery_method: studentUserInfo.data.UserProfile.delivery_method,
        };

         myPeepsArray.push(responseData);
      });
    } else {
      // if !isTeacher, get the tutorIds and do a get for all users with those ids
      await tutorStudentPairs.data.forEach(async (entry) => {
        let TutorId = entry.TutorId;
        let myTutorsInfo = await Axios.get(
          `/api/mydashboard/mypeeps/${TutorId}`
        );
        let dayArray = [];
        let subjectArray = [];
         myTutorsInfo.data.Subjects.forEach((subject) => {
          subjectArray.push(subject.subject);
        });

         myTutorsInfo.data.Availabilities.forEach((day) => {
          dayArray.push(day.day);
        });

        responseData = {
          firstName: myTutorsInfo.data.firstName,
          lastName: myTutorsInfo.data.lastName,
          email: myTutorsInfo.data.email,
          city: myTutorsInfo.data.UserProfile.city,
          state: myTutorsInfo.data.UserProfile.state,
          bio: myTutorsInfo.data.UserProfile.bio,
          degree: myTutorsInfo.data.UserProfile.degree,
          experience: myTutorsInfo.data.UserProfile.experience,
          subjects: subjectArray,
          days: dayArray,
          delivery_method: myTutorsInfo.data.UserProfile.delivery_method,
        };

         myPeepsArray.push(responseData);
      });
    }
    await console.log(myPeepsArray);

    // Set the result state
    setResults(myPeepsArray);
  };
    console.log(results)

  const renderDashboardCard = () => {
    results.forEach((result) => {
      return <DashboardCard result={result} />
    })
  }

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
          <DashboardCard results={results} />
          {isTeacher ? (
            <div>
              <p className="has-text-centered">
                Welcome to your Learning Link Dashboard! Looks like you
                currently do not have any students!
                <br />
                Now that you have an account, students and parents can reach out
                to you for tutoring services! Be sure to regularly check your
                messages and your dashboard in case parents or students contact
                you for tutoring.
              </p>
            </div>
          ) : (
            <div>
              <p className="has-text-centered">
                Welcome to your Learning Link Dashboard! Looks like you
                currently do not have any tutors!
                <br />
                To get started, search for tutors that meet your needs using the
                "Search for a Tutor" button in the menu. From there, you'll be
                able to view tutors, add them to your dashboard, and send them a
                message.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
