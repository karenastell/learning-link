import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu';

export default function AllMessages() {
  let senderIdArray = [];
  let tempArray = [];
  let noDuplicates;

  const { userId } = useContext(AuthContext);
  const [senderNameArray, setSenderNameArray] = useState([]);
  const [readReviewModal, setReadReviewModal] = useState('modal');
  const [reviewModal, setReviewModal] = useState('modal');
  const [removeMessage, setRemoveMessage] = useState('modal');


  console.log(userId);

  const handleModalClose = () => {
    setReviewModal('modal');
    setRemoveMessage('modal');
    setReadReviewModal('modal');
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setRemoveMessage('modal is-active')
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

  useEffect(async () => {
    await getMessages();
    await setSenderNameArray(tempArray);
  }, []);

  return (
    <>
      <Nav />
      <div className='columns'>
        <div className='column is-narrow'>
          <SideBarMenu />
        </div>
        <div className='column'>
          <h1 className='title is-3'>
            Click on a name to send and view messages
          </h1>
          {senderNameArray.map((person) => (
            <ul>
              <li>
                {person.firstName} {person.lastName}{' '}
                <button
                  onClick={handleDelete}
                  className='is-danger delete'
                  value={person.id}
                ></button>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className={removeMessage}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              You are about to remove from your Dashboard
            </p>
            <button
              className='delete'
              aria-label='close'
              onClick={handleModalClose}
            ></button>
          </header>
          <section className='modal-card-body'>
            <p>Are you sure you want to remove from your dashboard?</p>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success' 
            // onClick={removeFromDashboard}
            >
              Yes, I'm sure
            </button>
            <button className='button' onClick={handleModalClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
