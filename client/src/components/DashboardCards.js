import React, { useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function DashboardCard({ result }) {
  const { isTeacher } = useContext(AuthContext)

  const cardStyle = {
    maxHeight: '200px',
    overflow: 'scroll'
  }

  return (
    <div className="column is-one-third">
             <div className='card mb-6'>
          <header className='card-header'>
            <p className='card-header-title'>
              {result.firstName} {result.lastName}
            </p>
          </header>
          <div style={cardStyle} className='card-content'>
            <div className='content'>
              <ul>
                <li>Email: {result.email}</li>
                { !isTeacher ? <li>Day(s) Available: {result.days.join(', ')}</li> : null }
                <li>
                  Location: {result.city}, {result.state}
                </li>
                <li>Bio: {result.bio}</li>
                { !isTeacher ? <li>Degree: {result.degree}</li> : <li>Grade: {result.grade}</li>}
                { !isTeacher ? <li>Experience: {result.experience}</li> : <li>My School: {result.school}</li>}
                <li>Subjects: </li>
                <ul>
                  {result.subjects.map((sub) => (
                    <li>{sub}</li>
                  ))}
                </ul>
                <li>Delivery Method: {result.delivery_method}</li>
                { result.rate ? <li>Rate: ${result.rate} per hour</li> : null}
              </ul>
            </div>
          </div>
          <footer className='card-footer'>
            <a href='#' className='card-footer-item'>
              Message {result.firstName} {result.lastName}
            </a>
            { !isTeacher ? <a
              href='#'
              // onClick={() => addTutor(result.UserId)}
              className='card-footer-item'
            >
              Leave a Review
            </a> : null}
          </footer>
        </div>
    </div>
  );
}
