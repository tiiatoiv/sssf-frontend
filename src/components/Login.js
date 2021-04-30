import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql, useQuery, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, AUTH_USERNAME } from '../constants';
import './login.css';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!,
    $password: String!,
  ) {
    register(
      username: $username,
      password: $password,
    ) {
      username
    }
  }
`;

const LOGIN_QUERY = gql`
  query LoginQuery(
    $username: String!,
    $password: String!,
  ) {
    login(
      username: $username,
      password: $password,
      ) {
        username
        token
    }
  }
`;

const USERINFO_MUTATION = gql`
  mutation SignupMutation(
    $userID: String!,
    $main: String!,
    $description: String!,
  ) {
    addUserInfo(
      userID: $username,
      main: "not submitted",
      description: "not submitted",
    ) {
      id
      userID
      username
      main
      description
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const [login, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: ({ login}) => {
      console.log("TÄMÄ DATA", login);
      localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem(AUTH_USERNAME, login.username);
      console.log("LOGI TOKE", login.token);
      history.push('/');
      window.location.reload();
    },
    onError(error) {
      console.log("TÄMÄ ERRO");
      console.error(error)
    },
  }
  );

  
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      history.push('/');
      window.location.reload();
    }
  });

  return (
    <div className="loginform">
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Your username"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
      <button
        onClick={formState.login ? login : signup}
      >
        {formState.login ? 'login' : 'create account'}
      </button>
      <button
        onClick={(e) =>
          setFormState({
            ...formState,
            login: !formState.login
          })
        }
      >
        {formState.login
          ? 'need to create an account?'
          : 'already have an account?'}
      </button>
    </div>
    </div>
  );
};

export default Login;