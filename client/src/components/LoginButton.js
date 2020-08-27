import React from 'react';

export default function LoginButton(props) {


  return (
    <>
      <div id="navbarBasicExample" className="navbar-end">
        <div className="navbar-end">
          <div className="buttons">
            <button className="button ml-2 mr-5 is-primary" onClick={props.handleModalDisplay}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
