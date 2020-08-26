import React from 'react';
import Axios from 'axios';

export default function TutorSearchResult(props) {
  const addTutor = (value) => {

    console.log(props.results);
    Axios.post('/api/TutorStudent', {
      TutorId: value,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className='mt-6'>
      <h1 className='title'>Tutor Search Results</h1>
      {props.results.map((result) => (
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
            <a href='#' onClick={()=>addTutor(result.UserId)} className='card-footer-item'>
              Add Tutor To Your Dashboard
            </a>
          </footer>
        </div>
      ))}
    </div>
  );
}
