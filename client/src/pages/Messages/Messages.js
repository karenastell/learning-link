import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import Axios from 'axios';
import Nav from '../../components/Nav';
import SideBarMenu from '../../components/SideBarMenu';
import { AuthContext } from '../../AuthContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../../components/Message/Message';
import './Messages.css';

let socket;

export default function Messages({ location }) {
  const [user1, setUser1] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { isTeacher } = useContext(AuthContext);
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');

  const ENDPOINT = process.env.PORT || 'localhost:3000';

  useEffect(() => {
    const { user1, user2 } = queryString.parse(location.search);
    const startFunction = async () => {
      const { user1, user2 } = queryString.parse(location.search);

      if (isTeacher) {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user1}/student${user2}`
        );
        console.log(messageRoomInfo);
        await setRoom(messageRoomInfo.data.roomInfo[0].room);
        console.log(messageRoomInfo.data.userInfo.firstName);
        await setSenderName(messageRoomInfo.data.userInfo.firstName);
        await setReceiverName(messageRoomInfo.data.roomInfo[0].User.firstName);
        console.log(senderName, receiverName);
      } else {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user2}/student${user1}`
        );
        console.log(messageRoomInfo);
        await setRoom(messageRoomInfo.data.roomInfo[0].room);
        console.log(messageRoomInfo.data.userInfo.firstName);
        await setReceiverName(messageRoomInfo.data.userInfo.firstName);
        await setSenderName(messageRoomInfo.data.roomInfo[0].User.firstName);
        console.log(senderName, receiverName);
      }
    };
    startFunction();
    socket = io(ENDPOINT);

    setUser1(user1);

    console.log(socket);

    socket.emit('join', { user1, room }, () => {});

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
    const { user1, user2 } = queryString.parse(location.search);
    if (isTeacher) {
      Axios.post(
        `/api/message/tutor${user1}/student${user2}/sender${user1}/room${room}`,
        { message: message }
      );
    } else {
      Axios.post(
        `/api/message/tutor${user2}/student${user1}/sender${user1}/room${room}`,
        { message: message }
      );
    }
  };

  console.log(message, messages);
  console.log(senderName, receiverName);

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='column container'>
          <h1 className='title'>Send {senderName} a message...</h1>
          <div className='container'>
            <article className='tile box tileStyle'>
              <ScrollToBottom>
                {messages.map((message, i) => (
                  <div className='messageContent' key={i}>
                    <Message
                      senderName={senderName}
                      receiverName={receiverName}
                      message={message}
                      user1={user1}
                    />
                  </div>
                ))}
              </ScrollToBottom>
            </article>
            <form className='form1'>
              <input
                className='input1'
                type='text'
                placeholder='Enter a message...'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) =>
                  event.key === 'Enter' ? sendMessage(event) : null
                }
              />
              <button
                className='sendButton'
                onClick={(event) => sendMessage(event)}
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className='column'>
          <h3 className='title is-3'>Your Messages</h3>
        </div>
      </div>
    </>
  );
}
