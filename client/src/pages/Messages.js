import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import Axios from 'axios';
import Nav from '../components/Nav';
import SideBarMenu from '../components/SideBarMenu';
import { AuthContext } from '../AuthContext';
// import MessageModal from '../components/MessageModal';

let socket;

export default function Messages({ location }) {
  const [user1, setUser1] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { isTeacher } = useContext(AuthContext);
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
    // const startFunction = async () => {
    //   const { user1, user2 } = queryString.parse(location.search);

    //   if (isTeacher) {
    //     const messageRoomInfo = await Axios.get(
    //       `/api/message-room/tutor${user1}/student${user2}`
    //     );
    //     console.log(messageRoomInfo);
    //     await setRoom(messageRoomInfo.data[0].room);
    //   } else {
    //     const messageRoomInfo = await Axios.get(
    //       `/api/message-room/tutor${user2}/student${user1}`
    //     );
    //     console.log(messageRoomInfo);
    //     console.log(messageRoomInfo.data[0].room);
    //     await setRoom(messageRoomInfo.data[0].room);
    //   }
    // };
    // startFunction();
  }, []);

  useEffect(() => {
    const { user1, user2 } = queryString.parse(location.search);
    const startFunction = async () => {
      const { user1, user2 } = queryString.parse(location.search);

      if (isTeacher) {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user1}/student${user2}`
        );
        console.log(messageRoomInfo);
        await setRoom(messageRoomInfo.data[0].room);
      } else {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user2}/student${user1}`
        );
        console.log(messageRoomInfo);
        console.log(messageRoomInfo.data[0].room);
        await setRoom(messageRoomInfo.data[0].room);
      }
    };
    startFunction();
    socket = io(ENDPOINT);

    setUser1(user1);

    console.log(socket);

    socket.emit('join', { user1, room }, () => {
      
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

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
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
          />
        </div>
      </div>
    </>
  );
}
