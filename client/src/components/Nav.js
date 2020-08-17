import React from 'react';

export default function Nav() {
  return (
    <nav
      className="navbar is-flex-desktop nav-style"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <h1 className="title title-margin label-text">Learning Link</h1>
      </div>
      <div id="navbarBasicExample" className="navbar-end">
        <div className="navbar-end">
          <div className="buttons">
            <a className="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
