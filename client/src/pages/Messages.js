import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import axios from 'axios';
import Nav from '../components/Nav';
import SideBarMenu from '../components/SideBarMenu';
// import MessageModal from '../components/MessageModal';

let socket;

export default function Messages({ location }) {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
    const { user1, user2 } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setUser1(user1);
    setUser2(user2);

    console.log(socket);

    socket.emit('join', { user1, user2 }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='column'>
          <h1 className='title'>messages</h1>
        </div>
      </div>
    </>
  );
}
