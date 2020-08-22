import React from 'react';

export default function LoginButton(props) {


  return (
    <>
      <div id="navbarBasicExample" className="navbar-end">
        <div className="navbar-end">
          <div className="buttons">
            <p>Already have an account?</p>
            <a className="button is-light ml-2" onClick={props.handleModalDisplay}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
