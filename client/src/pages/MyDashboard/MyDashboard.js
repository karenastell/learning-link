import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import Nav from '../../components/Nav/Nav';
import Axios from 'axios';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import './MyDashboard.css';

export default function MyDashboard() {
  const { userId, isTeacher } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    if (userId) {
      getUserInfo();
      getMyStudentTutorPairs();
    }
  }, []);

  // useEffect(() => {
  //   console.log(results);
  // }, [results]);

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
    });
  };

  // This gets all of the tutor/student matches that matchup with the current user
  const getMyStudentTutorPairs = async () => {
    // Get the student-tutor pairs from the TutorStudent table
    const tutorStudentPairs = await Axios.get(`/api/mydashboard/${userId}`);
    console.log(tutorStudentPairs.data);
    getMyPeepsInfo(tutorStudentPairs.data);
  };

  const getMyPeepsInfo = async (data) => {
    const myPeepsArray = [];
    // if isTeacher, get the studentIds and do a get for all users with those ids
    if (isTeacher) {
      // forEach studentId in the response...
      for (let i = 0; i < data.length; i++) {
        let studentUserInfo = await Axios.get(
          `/api/mydashboard/mypeeps/${data[i].StudentId}`
        );
        const response = studentUserInfo.data;
        let subjectArray = [];
        studentUserInfo.data.Subjects.forEach((subject) => {
          subjectArray.push(subject.subject);
        });
        // console.log(subjectArray, "subject array")
        let responseData = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          city: response.UserProfile.city,
          state: response.UserProfile.state,
          bio: response.UserProfile.bio,
          grade: response.UserProfile.grade,
          school: response.UserProfile.school,
          special_ed: response.UserProfile.special_ed,
          subjects: subjectArray,
          delivery_method: response.UserProfile.delivery_method,
        };
        myPeepsArray.push(responseData);
      }
    } else {
      // if !isTeacher, get the tutorIds and do a get for all users with those ids

      for (let i = 0; i < data.length; i++) {
        let myTutorsInfo = await Axios.get(
          `/api/mydashboard/mypeeps/${data[i].TutorId}`
        );
        const response = myTutorsInfo.data;
        let dayArray = [];
        let subjectArray = [];
        myTutorsInfo.data.Subjects.forEach((subject) => {
          subjectArray.push(subject.subject);
        });

        myTutorsInfo.data.Availabilities.forEach((day) => {
          dayArray.push(day.day);
        });

        let responseData = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          city: response.UserProfile.city,
          state: response.UserProfile.state,
          bio: response.UserProfile.bio,
          degree: response.UserProfile.degree,
          experience: response.UserProfile.experience,
          subjects: subjectArray,
          days: dayArray,
          delivery_method: response.UserProfile.delivery_method,
          rate: response.UserProfile.rate,
        };

        myPeepsArray.push(responseData);
      }
    }
    setResults(myPeepsArray);
  };

  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow side-bar">
          <SideBarMenu />
        </div>
        <div className="column mt-5  my-dash-div font-style">
          <h1 className="title is-centered">Hello {userInfo.firstName},</h1>
          <h2 className="subtitle is-size-4">
            Welcome to your Learning Link Dashboard!
          </h2>

          {isTeacher ? (
            <div className="mb-5">
              <p>
                Students and parents can add you to their dashboard and reach
                out to you for tutoring services! When you are added to
                someone's dashboard, they are also added to yours! Be sure to
                regularly check your messages and your dashboard in case parents
                or students contact you for tutoring.
              </p>
              <h3 className="is-size-4 mt-4">Your Current Students: </h3>
            </div>
          ) : (
            <div className="mb-5">
              <p>
                To get started, search for tutors that meet your needs using the
                "Search for a Tutor" button in the menu. From there, you'll be
                able to view tutors, add them to your dashboard, and send them a
                message.
                <br/>
                You can schedule tutoring sessions with your tutors by clicking the calendar icon <img src="./calendar.png" alt="calendar" width="40px"/> near their name on your dashboard.
              </p>
              <h3 className="is-size-4 mt-4">Your Current Tutors: </h3>
            </div>
          )}
          <div className="container">
            <div className="columns is-multiline">
              {results.map((person) => (
                <DashboardCard
                  key={person.id}
                  result={person}
                  getMyStudentTutorPairs={getMyStudentTutorPairs}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
