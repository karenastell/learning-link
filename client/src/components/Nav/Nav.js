import React, { useState, useContext } from 'react';
import LoginButton from '../LoginButton';
import LogoutButton from '../../components/LogoutButton';
import { AuthContext } from '../../AuthContext';
import Axios from 'axios';

import './Nav.css';

export default function Nav() {
  const { isAuth, setIsAuth, setUserId, setIsTeacher} = useContext(AuthContext);
  const emptyCreds = { emailInput: '', passwordInput: '' };
  const errorMessage = 'Incorrect email or password';
  const [formData, setFormData] = useState(emptyCreds);
  const [credsAreInvalid, setCredsAreInvalid] = useState('');
  const [modal, setModal] = useState('modal');

  const [alert, setAlert] = useState('off');
  
  // displays the modal when the login button is clicked
  const handleModalDisplay = () => {
    setModal('modal is-active');
  };

  // closes the modal when the close button is clicked
  const handleModalClose = () => {
    setModal('modal');
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputCreds = {
      email: formData.emailInput,
      password: formData.passwordInput,
    };
    login(inputCreds);
  };

  const login = (loginCreds) => {
    Axios.post('/api/auth/login', loginCreds)
      .then((user) => {
        setUserId(user.data.id);
        setIsTeacher(user.data.isTeacher);
        setIsAuth(true);
        setModal('modal');
        setAlert('off');
        setFormData(emptyCreds);
      })
      .catch((err) => {
        setCredsAreInvalid(errorMessage);
        setAlert('on')
        console.log(err);
      });
  };


  return (
    <>
      <nav
        className="navbar is-flex-desktop nav-style nav-and-modal"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <h1 className="title title-margin label-text is-size-3-mobile nav-and-modal-text nav-text">Learning Link</h1>
        </div>
        {/* if the user is logged in, the LogoutButton displays, if not, the loginButton */}
        { isAuth ? <LogoutButton /> : <LoginButton handleModalDisplay={handleModalDisplay} /> }
      </nav>

      {/* modal for the login */}
      <div className={modal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head nav-and-modal">
            <p className="modal-card-title nav-and-modal-text">Login to Learning Link</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleModalClose}
            ></button>
          </header>
          {/* email input */}
          <section className="modal-card-body font-style">
          {alert === 'on' ? (
                <article className="message is-danger">
                  <div className="message-body">
                    {errorMessage}
                  </div>
                </article>
              ) : null}
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
                      name="emailInput"
                      onChange={handleInputChange}
                      value={formData.emailInput}
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
                      name="passwordInput"
                      onChange={handleInputChange}
                      value={formData.passwordInput}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="control has-text-centered">
              <button
                className="button is-info is-fullwidth"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
