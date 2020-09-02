import React from 'react';
import './OneMessage.css';

export default function OneMessage({
  senderId,
  userId,
  message,
  firstName,
  isTeacher,
  senderName,
  date,
}) {
  console.log(senderId);
  console.log(userId);
  console.log(message);
  console.log(firstName);
  console.log(isTeacher);
  console.log(senderName);
  console.log(
    new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
  );
  console.log(
    new Date(date).toLocaleString([], { month: 'short', day: 'numeric' })
  );

  return (
    <div className='oneMessage-div'>
      {senderId === null ? null : senderId === userId ? (
        <p className='oneMessage-message'>
          <span className='messageDate'>
            {new Date(date).toLocaleString([], {
              month: 'short',
              day: 'numeric',
            })}{' '}
            {new Date(date).toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span className='senderName-message'>You</span>: {message}
        </p>
      ) : !isTeacher ? (
        <p className='oneMessage-message messageContainer justifyStart'>
          <span className='senderName-message pr-10'>{firstName}</span>:
          <div className='messageBox backgroundLight'>
            <p className='receiverText messageText'>{message}</p>
            <p className='messageDate'>
              {new Date(date).toLocaleString([], {
                month: 'short',
                day: 'numeric',
              })}{' '}
              {new Date(date).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </p>
      ) : (
        <p className='oneMessage-message'>
          <span className='messageDate'>
            {new Date(date).toLocaleString([], {
              month: 'short',
              day: 'numeric',
            })}{' '}
            {new Date(date).toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span className='senderName-message'>{senderName}</span>: {message}
        </p>
      )}
    </div>
  );
}
