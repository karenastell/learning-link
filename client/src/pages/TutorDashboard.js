import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';


export default function TutorDashboard(props) {
  return (
    <>
      <SideBarMenu />
      <h1 className='title'>tutor dashboard</h1>
      <div>
        <div>Student's you're tutoring</div>
      </div>
    </>
  );
}
// const tutorDiv=  {
// border: '1px solid black',
// width: '90%'
// }