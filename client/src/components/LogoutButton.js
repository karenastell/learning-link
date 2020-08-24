import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  return (
    <div id="navbarBasicExample" className="navbar-end">
      <div className="navbar-end">
        <div className="buttons">
          <a className="button is-light ml-2" onClick={logout} >Logout</a>
        </div>
      </div>
    </div>
  );
}
