import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function SideBarMenu() {
  const { isTeacher } = useContext(AuthContext);
  
  return (
    <aside className="menu ml-4 pt-6">
      <p className="menu-label">Menu</p>
      <ul className="menu-list">
        <li>
          <Link to="/student-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/myprofile">My Profile</Link>
        </li>
        {!isTeacher ? (
          <li>
            <Link to="/search">Search for a Tutor</Link>
          </li>
        ) : null}
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </aside>
  );
}


