import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const GET_GAMESTATS = gql`
  query GetGameStats {
    gamestats {
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
        map
        kills
        deaths
        assist
      }
    }
  `
})
.then(result => console.log(result));

function GameStats() {
  const { loading, error, data } = useQuery(GET_GAMESTATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.gamestats.map(({ gameResult, agent, map, kills, deaths, assist }) => (
    <div key={gameResult}>
      <h2>Game Result</h2>
      <h3>End result, Agent, Map</h3>
      <p>
        {gameResult} : {agent} : {map}
      </p>
      </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>Game Stats</h2>
        <GameStats />
      </div>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
