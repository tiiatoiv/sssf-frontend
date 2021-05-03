import { Button } from 'react';
import React from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, AUTH_USERNAME } from '../constants';
import Login from './Login.js';

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
      <div className="flex flex-fixed">
        {authToken ? (
          <button
            className="logoutbutton"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              localStorage.removeItem(AUTH_USERNAME);
              history.push(`/login`);
              window.location.reload();
            }}
          ><h1>Log out</h1></button>
        ) : (
          <Login />
        )}
      </div>
  );
};

export default Header;