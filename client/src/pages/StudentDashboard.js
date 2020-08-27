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
      getMyStudentTutorPairs();
    }
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

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

  // This gets all of the tutor/student matches that matchup with the current user
  const getMyStudentTutorPairs = async () => {
    // Get the student-tutor pairs from the TutorStudent table
    const tutorStudentPairs = await Axios.get(`/api/mydashboard/${userId}`);
    console.log(tutorStudentPairs.data);
    getMyPeepsInfo(tutorStudentPairs.data);
    // tempFunctionGet(tutorStudentPairs.data)
  };

  // TODO: Get rid of this... once you feel comfortable that everything is working.... or use this one instead: it is less code, but the state isn't as nicely organized. Just add the if isTeacher stuff
  // const Array = [];
  // const tempFunctionGet = async (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     await Axios.get(`/api/mydashboard/mypeeps/${data[i].StudentId}`).then(
  //       (response) => {
  //         console.log(response);
  //         Array.push(response.data);
  //       }
  //     );
  //   }

  //   console.log(Array);
  //   setResults(Array);
  // };

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
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="column">
          <h1 className="title">
            Hello {userInfo.firstName} {userInfo.lastName}!{' '}
            <span className="is-size-4">
              Welcome to your Learning Link Dashboard!
            </span>
          </h1>

          {isTeacher ? (
            <div className="mb-5">
              <p>
                Students and parents can add you to their dashboard and reach
                out to you for tutoring services! When you are added to
                someone's dashboard, they are also added to yours! Be sure to
                regularly check your messages and your dashboard in case parents
                or students contact you for tutoring.
              </p>
            </div>
          ) : (
            <div className="mb-5">
              <p>
                To get started, search for tutors that meet your needs using the
                "Search for a Tutor" button in the menu. From there, you'll be
                able to view tutors, add them to your dashboard, and send them a
                message.
              </p>
            </div>
          )}
          <div className="container">
            <div className="columns is-multiline">
              {results.map((person) => (
                <DashboardCard key={person.firstName} result={person} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
