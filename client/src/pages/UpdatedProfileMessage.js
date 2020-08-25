import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function UpdateProfileMessage(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <div className="columns">
        <SideBarMenu />
        <div className="container">
          <article className="message is-primary is-large">
            <div className="message-body">Your profile has been updated!</div>
          </article>
          {/* <div className="columns is-centered">
            <Link to='/myprofile' className="column button is-primary is-half">View My Profile</Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
