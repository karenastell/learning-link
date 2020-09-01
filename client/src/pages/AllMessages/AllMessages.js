import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import Nav from '../../components/Nav/Nav';
import SideBarMenu from '../../components/SideBarMenu';

export default function AllMessages() {
  let senderIdArray = [];
  let tempArray = [];
  let noDuplicates;

  const { userId, isTeacher } = useContext(AuthContext);
  const [senderNameArray, setSenderNameArray] = useState([]);

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
      const allCorrespondence = await Axios.get(
        `api/all-messages/${id}/${userId}`
      );
      console.log(allCorrespondence);
    } else {
      const allCorrespondence = await Axios.get(
        `api/all-messages/${userId}/${id}`
      );
      console.log(allCorrespondence);
    }
  };

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
                <button onClick={()=>viewAllMessages(person.id)} className='delete'></button>
              </li>
            </ul>
          ))}
        </div>
        <div className='column is-two-thirds'>
            <h3 className ='title is-3'>Your Messages With ***</h3>
            {allCorrespondence.data.map((message)=>{
                
            })}
            
        </div>
      </div>
    </>
  );
}
