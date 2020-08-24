import React from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function UpdateProfileMessage(props) {
  return (
    <>
      <div className="columns">
        <SideBarMenu />
        <div className="container">
          <article class="message is-primary is-large">
            <div class="message-body">Your profile has been updated!</div>
          </article>
          <div className="columns is-centered">
            <Link to='/myprofile' className="column button is-primary is-half">View My Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}
