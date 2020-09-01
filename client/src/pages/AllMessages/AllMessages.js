import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import OneMessage from '../../components/OneMessage/OneMessage';
import './AllMessages.css';

export default function AllMessages() {
  let senderIdArray = [];
  let tempArray = [];
  let noDuplicates;
  let allCorrespondence;

  const { userId, isTeacher } = useContext(AuthContext);
  const [senderNameArray, setSenderNameArray] = useState([]);
  const [correspondence, setCorrespondence] = useState([]);
  const [senderName, setSenderName] = useState('');

  console.log(userId);

  const handleDelete = (event) => {
    event.preventDefault();
    alert(event.target.value);
  };

  const getMessages = async () => {
    const allMessages = await Axios.get(`api/all-messages/${userId}/`);
    console.log(allMessages);
    for (let i = 0; i < allMessages.data.length; i++) {
      senderIdArray.push(allMessages.data[i].TutorId);
      console.log(senderIdArray);
    }

    noDuplicates = [...new Set(senderIdArray)];
    console.log(noDuplicates);

    for (let i = 0; i < noDuplicates.length; i++) {
      const sentMessagesTo = await Axios.get(
        `api/sent-messages-to/${noDuplicates[i]}`
      );
      console.log(sentMessagesTo);

      await tempArray.push({
        id: sentMessagesTo.data.id,
        firstName: sentMessagesTo.data.firstName,
        lastName: sentMessagesTo.data.lastName,
      });
    }
  };

  useEffect(() => {
    const thisFunction = async () => {
      await getMessages();
      await setSenderNameArray(tempArray);
    };
    thisFunction();
  }, []);

  const viewAllMessages = async (id) => {
    console.log(id);
    if (isTeacher) {
      allCorrespondence = await Axios.get(`api/all-messages/${id}/${userId}`);
      console.log(allCorrespondence);
      setCorrespondence(allCorrespondence.data);
      setSenderName(allCorrespondence.data[0].User.firstName);
    } else {
      allCorrespondence = await Axios.get(`api/all-messages/${userId}/${id}`);
      console.log(allCorrespondence);
      setCorrespondence(allCorrespondence.data);
      setSenderName(allCorrespondence.data[0].User.firstName);
    }
  };

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow side-bar'>
          <SideBarMenu />
        </div>
        <div className='container columns m-2'>
          <div className='column is-one-quarter'>
            <p className='mb-2'>Click on a name to view messages:</p>
            {senderNameArray.map((person) => (
              <ul>
                <li>
                  <button
                    onClick={() => viewAllMessages(person.id)}
                    className='button is-info is-light mb-2'
                  >
                    {person.firstName} {person.lastName}
                  </button>
                </li>
              </ul>
            ))}
          </div>
          <div className='column is-two-thirds'>
            {senderName ? (
              <div className='allMessages-messages'>
                <h3 className='title is-3'>Your Messages With {senderName}</h3>
                {correspondence.map((message) => (
                  <OneMessage
                    key={message.createdAt}
                    senderId={message.SenderId}
                    userId={userId}
                    message={message.message}
                    firstName={message.User.firstName}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
