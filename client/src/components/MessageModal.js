import React, { useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

export default function MessageModal({ location }) {
  useEffect(() => {
    const data = queryString.parse(location.search);

    console.log(data, location.search);
  });

  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Modal title</p>
          <button className='delete' aria-label='close'></button>
        </header>
        <section className='modal-card-body'></section>
        <footer className='modal-card-foot'>
          <button className='button is-success'>Save changes</button>
          <button className='button'>Cancel</button>
        </footer>
      </div>
    </div>
  );
}
