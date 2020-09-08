import React from 'react';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import './EventBookedAlert.css';

export default function EventBookedAlert() {


  return (
    <>
      <Nav />
      <div className="columns">
        <div className="column is-narrow side-bar">
          <SideBarMenu />
        </div>
          <div className="column event-alert-div">
            <article className="message is-info mt-6">
              <div className="message-body p-6">
                You successfully booked a session with your tutor!  A message has been sent to your tutor to notify them of the new appointment!  You may view all of your own appointments with your tutors by selecting <strong>My Calendar</strong> in the Menu.
              </div>
            </article>
          </div>
        </div>
    
    </>
  );
}
