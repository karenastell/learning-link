import React from 'react';
import Axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function UpdateProfileMessage(props) {
  return (
    <>
      
        <div className='columns'>
          <SideBarMenu />
          <div className='container'>
          <h1 className="title">
              Profile has been updated
          </h1>
        </div>
      </div>
    </>
  );
}

