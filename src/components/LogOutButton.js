import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql, useQuery, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import LoginStyle from './login.css';
import { Button } from 'bootstrap';

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
        <Button></Button>
    </div>
  );
};

export default Login;