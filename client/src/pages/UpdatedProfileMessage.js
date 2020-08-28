import React, { useEffect } from 'react';
import Nav from '../components/Nav';
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
    <Nav />
      <div className="columns">
        <div className="column is-narrow">
          <SideBarMenu />
        </div>
        <div className="container column">
          <article className="message is-primary is-large">
            <div className="message-body">Your profile has been updated!</div>
          </article>
        </div>
      </div>
    </>
  );
}
