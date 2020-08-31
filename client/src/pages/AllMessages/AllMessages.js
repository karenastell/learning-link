import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu';

export default function AllMessages() {
  let senderIdArray = [];
  let senderNameArray = [];
  let noDuplicates;

  const { userId } = useContext(AuthContext);
  console.log(userId);

  const getMessages = async () => {
    const allMessages = await Axios.get(`api/all-messages/${userId}/`);
    console.log(allMessages);
    allMessages.data.forEach((sender) => {
      senderIdArray.push(sender.TutorId);
      console.log(senderIdArray);
    });

    noDuplicates = [...new Set(senderIdArray)];
    console.log(noDuplicates);

    noDuplicates.forEach(async (personId)=>{
        const sentMessagesTo = await Axios.get(`api/sent-messages-to/${personId}`)
        console.log(sentMessagesTo);
        senderNameArray.push({firstName: sentMessagesTo.data.firstName, lastName: sentMessagesTo.data.lastName});
        console.log(senderNameArray);
    })
    
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
          <h1 className='title is-3'>
            Click on a name to send and view messages
          </h1>
        </div>
      </div>
    </>
  );
}
