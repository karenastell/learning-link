import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import Axios from 'axios';
import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import { AuthContext } from '../../AuthContext';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import OneMessage from '../../components/OneMessage/OneMessage';

let socket;

export default function Messages({ location }) {
  const [user1, setUser1] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { isTeacher, userId } = useContext(AuthContext);
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [correspondence, setCorrespondence] = useState([]);
  const [senderNameArray, setSenderNameArray] = useState([]);
  const [senderId, setSenderId] = useState('');

  let senderIdArray = [];
  let noDuplicates;
  let tempArray = [];
  let allCorrespondence;
  let studentName;

  const ENDPOINT =
    'https://ancient-brushlands-96177.herokuapp.com/' || 'localhost:3000';

  useEffect(() => {
    const { user1, user2 } = queryString.parse(location.search);
    const startFunction = async () => {
      const { user1, user2 } = queryString.parse(location.search);
// set the room information dependent on if it is a teacher or student 
      if (isTeacher) {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user1}/student${user2}`
        );
        await setRoom(messageRoomInfo.data.roomInfo[0].room);
        await setSenderName(messageRoomInfo.data.userInfo.firstName);
        await setReceiverName(messageRoomInfo.data.roomInfo[0].User.firstName);
        await setSenderId(messageRoomInfo.data.userInfo.id);
      } else {
        const messageRoomInfo = await Axios.get(
          `/api/message-room/tutor${user2}/student${user1}`
        );
        await setRoom(messageRoomInfo.data.roomInfo[0].room);
        await setReceiverName(messageRoomInfo.data.userInfo.firstName);
        await setSenderName(messageRoomInfo.data.roomInfo[0].User.firstName);
        await setSenderId(messageRoomInfo.data.roomInfo[0].User.id);
      }
    };
    startFunction();
    getMessages();
    socket = io(ENDPOINT);

    setUser1(user1);

    // do something upon joining the room
    socket.emit('join', { user1, room }, () => {});

    return () => {
      // do something upon leaving the room
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  const getMessages = async () => {
    // get all messages sent to student or tutor
    if (!isTeacher) {
      const allMessages = await Axios.get(`api/all-messages/student${userId}/`);
      for (let i = 0; i < allMessages.data.length; i++) {
        senderIdArray.push(allMessages.data[i].TutorId);
      }
    } else {
      const allMessages = await Axios.get(`api/all-messages/tutor${userId}`);
      for (let i = 0; i < allMessages.data.length; i++) {
        senderIdArray.push(allMessages.data[i].StudentId);
      }
    }
    noDuplicates = [...new Set(senderIdArray)];

    for (let i = 0; i < noDuplicates.length; i++) {
      const sentMessagesTo = await Axios.get(
        `api/sent-messages-to/${noDuplicates[i]}`
      );

      await tempArray.push({
        id: sentMessagesTo.data.id,
        firstName: sentMessagesTo.data.firstName,
        lastName: sentMessagesTo.data.lastName,
      });
    }
  };

  const viewAllMessages = async (id) => {
       // get and display all messages sent only between a specific tutor and student
    if (isTeacher) {
      allCorrespondence = await Axios.get(`api/all-messages/${id}/${userId}`);
      await setCorrespondence(allCorrespondence.data);

      // tutor and student read messages tracked
      for (let i = 0; i < allCorrespondence.data.length; i++) {
        await setMessagesToRead(allCorrespondence.data[i].id);
      }
      studentName = await Axios.get(
        `api/all-messages/student-name/${allCorrespondence.data[0].StudentId}`
      );
      setSenderName(studentName.data.firstName);
    } else {
      allCorrespondence = await Axios.get(`api/all-messages/${userId}/${id}`);
      await setCorrespondence(allCorrespondence.data);
      await setSenderName(allCorrespondence.data[0].User.firstName);

      for (let i = 0; i < allCorrespondence.data.length; i++) {
        await setMessagesToRead(allCorrespondence.data[i].id);
      }
    }

    for (let i = 0; i < correspondence.length; i++) {
      setMessagesToRead(correspondence[i].id);
    }
  };

  const setMessagesToRead = (messageId) => {
    Axios.put(
      `api/all-messages/message${messageId}/tutor${isTeacher}`
    ).then((response) => {});
  };

  useEffect(() => {

    const { user1, user2 } = queryString.parse(location.search);
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    viewAllMessages(user2);
  }, [messages]);

  useEffect(() => {
    setSenderNameArray(tempArray);
  }, []);

// send a message to a user and post it to the db
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


  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow side-bar'>
          <SideBarMenu />
        </div>
        <div className='column container mt-5 font-style message-div-style'>
          <h1 className='title font-style px-2'>
            Send {senderName} a message...
          </h1>
          <div className='messageArea'>
            <article className='mx-3 tile box tileStyle'>
              <ScrollToBottom>
                <div className='messageSpace'>
                  {correspondence.map((message) => (
                    <OneMessage
                      key={message.createdAt}
                      isTeacher={isTeacher}
                      senderId={message.SenderId}
                      userId={userId}
                      message={message.message}
                      firstName={message.User.firstName}
                      senderName={senderName}
                      date={message.createdAt}
                    />
                  ))}
                </div>
              </ScrollToBottom>
            </article>
            <form className='form pl-2 columns'>
              <input
                className='message-input input'
                type='text'
                placeholder='Enter a message...'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) =>
                  event.key === 'Enter' ? sendMessage(event) : null
                }
              />
              <button
                className='sendButton button is-info is-light'
                onClick={(event) => sendMessage(event)}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
