import React from 'react';
import './OneMessage.css';

export default function OneMessage({
  senderId,
  userId,
  message,
  firstName,
  isTeacher,
  senderName,
}) {
  console.log(senderId);
  console.log(userId);
  console.log(message);
  console.log(firstName);
  console.log(isTeacher);
  console.log(senderName);

  return (
    <div className='oneMessage-div'>
      {senderId === null ? null : senderId === userId ? (
        <p className='oneMessage-message'>
          <span className='senderName-message'>You</span>: {message}
        </p>
      ) : !isTeacher ? (
        <p className='oneMessage-message'>
          <span className='senderName-message'>{firstName}</span>: {message}
        </p>
      ) : (
        <p className='oneMessage-message'>
          <span className='senderName-message'>{senderName}</span>: {message}
        </p>
      )}
    </div>
  );
}
