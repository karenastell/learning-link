import React from 'react';
import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';
import Nav from '../components/Nav/Nav';

export default function Calendar(props) {
  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="container column">
          <h1 className="title">Calendar</h1>
        </div>
      </div>
    </>
  );
}
