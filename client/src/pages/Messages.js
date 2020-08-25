import React from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import SideBarMenu from '../components/SideBarMenu';

export default function Messages(props) {
  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="column">
          <h1 className="title">messages</h1>
        </div>
      </div>
    </>
  );
}
