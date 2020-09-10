import React from 'react';
import './UserInfo.css'

export default function UserInfo(props) {
  // This handles the rendering of a message depending on whether the password confirm was correct or not
  const renderPasswordCheck = () => {
    if (
      props.formInfo.password === '' ||
      !props.formInfo.password ||
      props.formInfo.confirmPassword === '' ||
      !props.formInfo.confirmPassword
    ) {
      return null;
    } else if (
      props.formInfo.password === props.formInfo.confirmPassword
    ) {
      console.log('We have a match!');
      return <p className="password-correct is-size-7">Password confirmed!</p>;
    } else {
      return <p className="password-wrong is-size-7">Password does not match! Please check your passwords before continuing...</p>;
    }
  };
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Your Information *</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded">
              <input
                className="input"
                id="first-name"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={props.handleInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control is-expanded">
              <input
                className="input"
                id="last-name"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={props.handleInputChange}
              />
            </p>
          </div>

          <div className="field">
            <p className="control is-expanded">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Password *</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Confirm Password *</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded">
              <input
                className="input"
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={props.handleInputChange}
              />
            </p>
          </div>
        </div>
      </div>
      {renderPasswordCheck()}
    </>
  );
}
