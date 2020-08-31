import React from 'react';
import './Message.css';

export default function Message({
  message: { user, text },
  user1,
  senderName,
  receiverName,
}) {
  console.log(senderName, receiverName);

  let isSentByCurrentUser = false;

  if (user === user1) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyStart'>
      <p className='sentText pr-10'>{receiverName}:</p>
      <div className='messageBox backgroundLight'>
        <p className='receiverText messageText'>{text}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pl-10'>{senderName}:</p>
      <div className='messageBox backgroundBlue'>
        <p className='senderText messageText'>{text}</p>
      </div>
    </div>
  );
}
