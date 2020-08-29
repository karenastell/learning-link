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
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
Axios.get('/api/')

    const { user1, user2 } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setUser1(user1);
    setroom(room);

    console.log(socket);

    socket.emit('join', { user1, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // List all of the users that they have messages with

  // If they click on a person, a modal pops up and they can live message them (fingers crossed)
  // Have a message modal component
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
