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

  return (
    <div className='oneMessage-div'>
      {senderId === null ? null : senderId === userId ? (
        <div className='oneMessage-message messageContainer justifyEnd'>
          <div className='messageBox backgroundLight'>
            <p className='senderName-message'>You</p>
            <p className='receiverText messageText is-size-7-mobile'>{message}</p>
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
        </div>
      ) : !isTeacher ? (
        <div className='oneMessage-message messageContainer justifyStart '>
          <div className='messageBox backgroundBlue'>
            <p className='senderName-message'>{firstName}</p>
            <p className='senderText messageText is-size-7-mobile'>{message}</p>
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
        </div>
      ) : (
        <div className='oneMessage-message messageContainer justifyStart'>
          <div className='messageBox backgroundBlue'>
            <p className='senderName-message'>{senderName}</p>
            <p className='senderText messageText is-size-7-mobile'>{message}</p>
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
        </div>
      )}
    </div>
  );
}
