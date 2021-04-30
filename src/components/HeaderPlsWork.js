import { Button } from 'react';
import React from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import Login from './Login.js';

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
      <div className="flex flex-fixed">
        {authToken ? (
          <button
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              history.push(`/`);
              window.location.reload();
            }}
          >Log out</button>
        ) : (
          <Login />
        )}
      </div>
  );
};

export default Header;