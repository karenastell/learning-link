import React from 'react';
import Nav from '../components/Nav';

import axios from 'axios';
import SideBarMenu from '../components/SideBarMenu';

export default function ParentView(props) {
  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="column">
          <h1 className="title">student dashboard</h1>
        </div>
      </div>
    </>
  );
}
