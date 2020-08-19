import React from 'react';
import {Link} from 'react-router-dom'

export default function SideBarMenu() {
  return (
    <div style={menuStyle}>
      <aside className='menu'>
        <p className='menu-label'>Menu</p>
        <ul className='menu-list'>
          <li>
            <Link to='/student-dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/myprofile'>My Profile</Link>
          </li>
          <li>
            <Link to='/search'>Search for a Tutor</Link>
          </li>
          <li>
            <Link to='/messages'>Messages</Link>
          </li>
          <li>
            <Link to='/calendar'>Calendar</Link>
          </li>
        </ul>
       
      </aside>
    </div>
  );
}

const menuStyle = {
  width: '10%',
  height: '700px',
  marginLeft: '10px',
  marginRight: '10px',
  float: 'left',
  borderRight: '1px solid black'
};
