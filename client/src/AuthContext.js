import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  // have the userid available were needed
  const [userId, setUserId] = useState(undefined);

  const [isTeacher, setIsTeacher] = useState(undefined);
  const [results, setResults] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    Axios.get('api/auth/user_data').then((response) => {
      if (response.data.email) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  };

  const logout = async () => {
    Axios.get('/api/auth/logout')
      .then(() => {
        setIsAuth(false);
        return <Redirect to='/' />;
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userId,
        setUserId,
        setIsAuth,
        isTeacher,
        setIsTeacher,
        checkAuth,
        logout,
        results,
        setResults
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
