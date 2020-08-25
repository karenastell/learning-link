import React from 'react';

export default function LoginButton(props) {


  return (
    <>
      <div id="navbarBasicExample" className="navbar-end">
        <div className="navbar-end">
          <div className="buttons">
            <a className="button ml-2 mr-5 is-primary" onClick={props.handleModalDisplay}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
