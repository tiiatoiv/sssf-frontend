import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddGameInput from './components/AddGameInput.js';
import GameStats from './components/GameStats.js';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Logincomponent from './components/Login.js';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';
import { ApolloLink } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import './example.css';
import GameStatsByUser from './components/GameStatsByUserid.js';
import { useHistory } from 'react-router';
import HeaderPlsWork from './components/HeaderPlsWork.js';


const httpLink = createHttpLink({
  uri: 'https://sssfprojectbackend.herokuapp.com/graphql/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  console.log("TÄMÄ AUTH", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  uri: 'https://sssfprojectbackend.herokuapp.com/graphql/',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

  const authToken = localStorage.getItem(AUTH_TOKEN);

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <ApolloProvider client={client}>
      <div className="example">
    <Router>
      <div  style={{ backgroundColor: '#313131' }}>
        <h1>Stats App </h1>
        <ul>
          <li style={{ listStyle: 'none'}}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/add">Add</Link>
          </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/login">Login/Logout</Link>
            </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    </ApolloProvider>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div style={{ backgroundColor: '#313131' }}>
      {authToken ?
      <GameStats /> : <div style={{height: '1000px'}}><p>You have not logged in.</p></div> }
    </div>
  );
}

function Add() {
  return (
    <div>
      <h2>Add</h2>
      {authToken ?
      <AddGameInput /> : <div style={{height: '1000px'}}><p>You have not logged in.</p></div>}
    </div>
  );
}

function Login() {
  return (
    <div style={{height: '1000px'}}>
    <div className="flex flex-fixed">
    {authToken ? (
      <HeaderPlsWork />
    ) : (
      <Logincomponent />
    )}
  </div>
  </div>
  );
    }

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <p>Game stats by user token username</p>
      {authToken ? 
      <GameStatsByUser /> : <div style={{height: '1000px'}}><p>You have not logged in.</p></div>}
    </div>
  );
}
