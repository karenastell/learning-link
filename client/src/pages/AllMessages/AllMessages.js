import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu';

export default function AllMessages() {
  const { userId } = useContext(AuthContext);
  console.log(userId);

  const getMessages = async () => {
    const allMessages = await Axios.get(`api/all-messages/${userId}`);
    console.log(allMessages);
  };

  getMessages();

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='column'>
          <h1>all messages</h1>
        </div>
      </div>
    </>
  );
}
