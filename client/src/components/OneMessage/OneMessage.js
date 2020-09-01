import React from 'react';

export default function OneMessage({
  senderId,
  userId,
  message,
  firstName,
  isTeacher,
}) {
  return (
    <div>
      {senderId === null ? null : senderId === userId ? (
        <p>You: {message}</p>
      ) : (
        <p>
          {firstName}: {message}
        </p>
      )}
    </div>
  );
}
