import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function TutorDashboard(props) {
  return (
    <>
      
        <div className='columns'>
          <SideBarMenu />
          <div className='container'>
          <div className='column is-four-fifths'>
            <h1 className='title'>Tutor Dashboard</h1>
            <div style={dashboard}>
              <label className='checkbox mr-5'>
                <input
                  className='mr-2'
                  id='new-students'
                  type='checkbox'
                  name='newStudents'
                />
                Taking On New Students
              </label>
              <div style={tutorDiv}>
                <ul style={studentList}>
                  <li>Student:</li>
                  <li>Contact:</li>
                  <li>Subject:</li>
                  <li>Next Session:</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const dashboard = {
  width: '87%',
  float: 'left',
};
const tutorDiv = {
  border: '1px solid black',
};

const studentList = {
  margin: '15px',
  textDecoration: 'underline',
};
