import React, { useState } from 'react';
import LoginButton from '../components/LoginButton';

export default function Nav() {
  const [modal, setModal] = useState('modal');

  // displays the modal when the login button is clicked
  const handleModalDisplay = () => {
    setModal('modal is-active');
  };

  // closes the modal when the close button is clicked
  const handleModalClose = () => {
    setModal('modal');
  };

  return (
    <>
      <nav
        className="navbar is-flex-desktop nav-style"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <h1 className="title title-margin label-text">Learning Link</h1>
        </div>
    <LoginButton handleModalDisplay={handleModalDisplay} />
      </nav>

      {/* modal for the login */}
      <div className={modal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Login to Learning Link</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          {/* email input */}
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Email</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </p>
                </div>
              </div>
            </div>
            {/* Password input */}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Password</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className='control has-text-centered'>
              <button className='button is-primary is-fullwidth'>Submit</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
