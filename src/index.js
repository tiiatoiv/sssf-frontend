import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import Header from './components/Header.js';
import { Row } from 'react-bootstrap';
import AddGameInput from './components/AddGameInput.js';
import avatar from './killjoy-avatar.jpg';
import mapavatar from './bind-avatar.jpg';
import Login from './components/Login.js';
import {Switch} from 'react-router';
import {Route, Link} from 'react-router-dom';
import LinkList from 'react';
import GameStats from './components/GameStats.js';
import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from './components/TopNav.js';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const UPDATE_GAMESTAT = gql`
  mutation UpdateGameStat($id: String!, $gameResult: String!, $agent: String!) {
    updateTodo(id: $id, gameResult: $gameResult, agent: $agent) {
      id
      gameResult
      agent
    }
  }
`;

client
  .query({
    query: gql`
    query GetGameStats {
      gamestats {
        gameResult
        agent
        map {
          id
          mapName
        }
        kills
        deaths
        assist
      }
    }
  `
})
.then(result => console.log(result));


function App() {
  return (
    <Router>
    <ApolloProvider client={client}>
      <div style={{ backgroundColor: "#313131"}}>
        <Header />
        <TopNav />

        <h2>Add Stat</h2>
        <AddGameInput/>
        <GameStats />
      </div>
    </ApolloProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
