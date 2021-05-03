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
import { AUTH_TOKEN, AUTH_USERNAME } from './constants';
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
  const currentUser = localStorage.getItem(AUTH_USERNAME);

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
    <div className="wholeapp">
    <ApolloProvider client={client}>
      <div className="example">
    <Router>
      <div  style={{ backgroundColor: 'white' }}>
        <div className="navdiv">
        <h1>Stats App </h1>
        <ul>
          <li style={{ listStyle: 'none'}}>
            <Link to="/">Home</Link>
          </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/add">Add</Link>
          </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/profile">Profile</Link>
          </li>
          <li style={{ listStyle: 'none'}}>
            <Link to="/login">Login/Logout</Link>
            </li>
        </ul>
        </div>

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
    </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div style={{ backgroundColor: 'white', height: '1000px', marginTop: '80px'}}>
      <h2 style={{color: 'white'}}></h2>
      {authToken ?
      <GameStats /> : <div style={{height: '1000px'}}><p style={{color: 'black'}}>You have not logged in.</p></div> }
    </div>
  );
}

function Add() {
  return (
    <div style={{height: '1000px'}}>
      {authToken ?
      <AddGameInput /> : <div style={{height: '1000px'}}><p style={{color: 'black'}}>You have not logged in.</p></div>}
    </div>
  );
}

function Login() {
  return (
    <div style={{height: '1000px'}}>
    <div className="flex flex-fixed">
    {authToken ? ( <div><p>Log out</p>
      <HeaderPlsWork /></div>
    ) : (
      <div>
      <Logincomponent /> </div>
    )}
  </div>
  </div>
  );
    }

function Profile() {
  return (
    <div style={{height: '1000px'}}>
      <h2 style={{marginTop: '60px', fontFamily: 'ValorantFont'}}>Profile</h2>
      {authToken ? (
      <p style={{marginTop: '20px'}}>Hello {currentUser}!</p>) : <p></p>}

      {authToken ? 
      <GameStatsByUser /> : <div style={{height: '1000px'}}><p>You have not logged in.</p></div>}
    </div>
  );
}
