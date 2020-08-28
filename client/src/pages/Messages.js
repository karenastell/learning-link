import React from 'react';
import Axios from 'axios';
import Nav from '../components/Nav';
import SideBarMenu from '../components/SideBarMenu';

export default function Messages(props) {
  // List all of the users that they have messages with

  // If they click on a person, a modal pops up and they can live message them (fingers crossed)
  // Have a message modal component
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
