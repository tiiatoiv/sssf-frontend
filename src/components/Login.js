import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql, useQuery, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

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
      token
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

const Login = () => {
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
      localStorage.setItem(AUTH_TOKEN, login.token);
      console.log("LOGI TOKE", login.token);
      history.push('/');
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
      console.log("KIRJ TOKE", signup.token);
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push('/');
    }
  });

  return (
    <div>
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
        className="pointer mr2 button"
        onClick={formState.login ? login : signup}
      >
        {formState.login ? 'login' : 'create account'}
      </button>
      <button
        className="pointer button"
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