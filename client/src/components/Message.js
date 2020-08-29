import React from 'react';

export default function Message({ message: { user, text }, user1 }) {
  let isSentByCurrentUser = false;

  if (user === user1) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='justifyEnd'>
      <p className='sentText'>{user1}</p>
      <div>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div className='justifyStart'>
      <div>
        <p>{text}</p>
      </div>
      <p className='sentText'>{user}</p>
    </div>
  );
}
