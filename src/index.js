import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import Header from './Header.js';
import { Row } from 'react-bootstrap';
import AddGameInput from './AddGameInput.js';
import avatar from './killjoy-avatar.jpg';
import mapavatar from './bind-avatar.jpg';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const GET_GAMESTATS = gql`
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
`;

const CREATE_GAMESTAT = gql`
mutation ($gameResult: String!, $agent: String!, $map: String!, $kills: String!, $deaths: String!, $assist: String!) {
 addGameStat(gameResult: $gameResult, agent: $agent, map: $map, kills: $kills, deaths: $deaths, assist: $assist) {
   id
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
`;

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

function GameStats() {
  const { loading, error, data } = useQuery(GET_GAMESTATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.gamestats.map(({ gameResult, agent, map, kills, deaths, assist }) => (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "row", display : "inline-block"}}>
    <Row>
    <div style={{backgroundColor: "white", margin: "10px", padding: "20px", width: "200px"}} key={gameResult}>
      <h2>Game Result</h2>
      <h3>End result, Agent, Map</h3>
      <img src={avatar} alt="Logo" style={{ width: '100px '}}/>;
      <img src={mapavatar} alt="Logo" style={{ width: '100px '}}/>;
      <p>
        {gameResult} : {agent} : {map.mapName ? map.mapName : "Jotai muuta tekstii mitä haluut tilalle"}
      </p>
      <h3>Kills, Deaths, Assist</h3>
      <p>
        {kills} : {deaths} : {assist}
      </p>
      </div>
      </Row>
      </div>
  ));
}

function AddGameStat() {
  let input;
  const [addGameStat, { data }] = useMutation(CREATE_GAMESTAT);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addGameStat({
            variables: {
              gameResult: input.value,
              agent: input.value,
            map: input.value,
          kills: input.value,
        deaths: input.value,
      assist: input.value
    } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add GameStat</button>
      </form>
    </div>
  );
}

function NewGameStat() {
  const [gameResult, setGameResult] = React.useState("");
  const [agent, setAgent] = React.useState("");
  const [map, setMap] = React.useState("");
  const [kills, setKills] = React.useState("");
  const [deaths, setDeaths] = React.useState("");
  const [assist, setAssist] = React.useState("");
  const [addGameStat, { loading, error }] = useMutation(CREATE_GAMESTAT);

  function handleCreateGameStat(event) {
    event.preventDefault();
    // the mutate function also doesn't return a promise
    addGameStat({ variables: { gameResult, agent, map, kills, deaths, assist } });
  }

  return (
    <div>
      <h1>New Gamestat</h1>
      <form onSubmit={handleCreateGameStat}>
        <input onChange={(event) => setGameResult(event.target.value)} />
        <textarea onChange={(event) => setAgent(event.target.value)} />
        <button disabled={loading} type="submit">
          Submit
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}



const CreateLink = () => {
  const [formState, setFormState] = useState({
    gameResult: '',
    agent: '',
    map: '',
    kills: '',
    deaths: '',
    assist: '',
  });

  const [createLink] = useMutation(CREATE_GAMESTAT, {
    variables: {
      gameResult: formState.gameResult,
      agent: formState.agent,
      map: formState.map,
      kills: formState.kills,
      deaths: formState.deaths,
      assist: formState.assist
    }
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
          console.log( formState );
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.gameResult}
            onChange={(e) =>
              setFormState({
                ...formState,
                gameResult: e.target.value
              })
            }
            type="text"
            placeholder="Game result"
          />
          <input
            className="mb2"
            value={formState.agent}
            onChange={(e) =>
              setFormState({
                ...formState,
                agent: e.target.value
              })
            }
            type="text"
            placeholder="Agent"
          />
          <input
            className="mb2"
            value={formState.map}
            onChange={(e) =>
              setFormState({
                ...formState,
                map: e.target.value
              })
            }
            type="text"
            placeholder="Map"
          />
          <input
            className="mb2"
            value={formState.kills}
            onChange={(e) =>
              setFormState({
                ...formState,
                kills: e.target.value
              })
            }
            type="text"
            placeholder="Kills"
          />
          <input
            className="mb2"
            value={formState.deaths}
            onChange={(e) =>
              setFormState({
                ...formState,
                deaths: e.target.value
              })
            }
            type="text"
            placeholder="Deaths"
          />
          <input
            className="mb2"
            value={formState.assist}
            onChange={(e) =>
              setFormState({
                ...formState,
                assist: e.target.value
              })
            }
            type="text"
            placeholder="Assist"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

function GamestatsAnother() {
  const { loading, error, data } = useQuery(GET_GAMESTATS);
  const [UpdateGameStat] = useMutation(UPDATE_GAMESTAT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            UpdateGameStat({ variables: { id, type: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ backgroundColor: "#313131"}}>
        <Header />
        <h2>Add Stat</h2>
        <AddGameInput/>
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
