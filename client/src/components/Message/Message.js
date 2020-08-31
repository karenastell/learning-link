import React from 'react';
import './Message.css';

export default function Message({
  message: { user, text },
  setUser1,
  user1,
  senderName,
  receiverName,
}) {
  console.log(senderName, receiverName);
  console.log('user1: ', user1, 'user: ', user);

  let isSentByCurrentUser = false;

  if (user === user1) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyStart'>
      <p className='pr-10'>{receiverName}:</p>
      <div className='messageBox backgroundLight'>
        <p className='receiverText messageText'>{text}</p>
      </div>
    </div>
  ) : (
    <>
      {user === 'admin' ? (
        <div className='messageContainer justifyStart'>
          {/* <p>{user}:</p> */}
          <div className='messageBox adminBackground'>
            <p className='adminText messageText'>{text}</p>
          </div>
        </div>
      ) : (
        <div className='messageContainer justifyEnd'>
          <p className='pl-10'>{senderName}:</p>
          <div className='messageBox backgroundBlue'>
            <p className='senderText messageText'>{text}</p>
          </div>
        </div>
      )}
    </>
  );
}