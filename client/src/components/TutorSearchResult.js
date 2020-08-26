import React, { useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function TutorSearchResult(props) {
  const { userId } = useContext(AuthContext);

  console.log(userId);
  const addTutor = (id) => {
    Axios.post('/api/TutorStudent', {
      TutorId: id,
      StudentId: userId,
    }).then((response) => {
      console.log(response.data);
    });
  };

  console.log(props.results);
  const tutorResults = props.results.filter(
    (result) => result.isTeacher === true
  );
  console.log(tutorResults);

  return (
    <div className='mt-6'>
      <h1 className='title'>Tutor Search Results</h1>
      {tutorResults.map((result) => (
        <div className='card mb-6'>
          <header className='card-header'>
            <p className='card-header-title'>
              {result.firstName} {result.lastName}
            </p>
          </header>
          <div className='card-content'>
            <div className='content'>
              <ul>
                <li>Email: {result.email}</li>
                <li>Day(s) Available: {result.day.join(', ')}</li>
                <li>Location: {result.city}, {result.state}</li>
                <li>Bio: {result.bio}</li>
                <li>Degree: {result.degree}</li>
                <li>Experience: {result.experience}</li>
                <li>Subjects:</li>
                <li>Delivery Method: {result.delivery_method}</li>
              </ul>
            </div>
          </div>
          <footer className='card-footer'>
            <a href='#' className='card-footer-item'>
              Message This Tutor
            </a>
            <a
              href='#'
              onClick={() => addTutor(result.UserId)}
              className='card-footer-item'
            >
              Add Tutor To Your Dashboard
            </a>
          </footer>
        </div>
      ))}
    </div>
  );
}
