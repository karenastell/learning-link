import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './SideBarMenu.css';

export default function SideBarMenu() {
  const { isTeacher } = useContext(AuthContext);
  
  return (
    <aside className="menu ml-4 pt-4">
      <p className="menu-label">Menu</p>
      <ul className="menu-list">
        <li>
          <Link to="/student-dashboard"  className="menu-style">Dashboard</Link>
        </li>
        <li>
          <Link to="/myprofile" className="menu-style">My Profile</Link>
        </li>
        {!isTeacher ? (
          <li>
            <Link to="/search" className="menu-style">Search for a Tutor</Link>
          </li>
        ) : null}
        {/* <li>
          <Link to="/all-messages" className="menu-style">Messages</Link>
        </li>
        <li>
          <Link to="/calendar" className="menu-style">Calendar</Link>
        </li> */}
      </ul>
    </aside>
  );
}