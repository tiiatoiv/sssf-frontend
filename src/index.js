import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';

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

const ADD_GAMESTAT = gql`
  mutation AddGameStat($gameResulr: String!
     $agent: String!
      $map: String!
       $kills: String!
      $deaths: String!
       $assist: String!) {
    addGameStat(gameResult: $gameresult, agent: $agent, map: $map, kills: $kills, deaths: $deaths, assist: $assist) {
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

    <div style={{backgroundColor: "darkgray", margin: "10px"}} key={gameResult}>
      <h2>Game Result</h2>
      <h3>End result, Agent, Map</h3>
      <p>
        {gameResult} : {agent} : {data.gamestats.map.mapName}
      </p>
      <h3>Kills, Deaths, Assist</h3>
      <p>
        {kills} : {deaths} : {assist}
      </p>
      </div>
  ));
}


const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const [createLink] = useMutation(ADD_GAMESTAT, {
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





function AddGameStat() {
  let input;
  const [addGameStat, { data }] = useMutation(ADD_GAMESTAT);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addGameStat({ variables: { type: input.value } });
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
      <div>
        <h2>Game Stats</h2>
        <CreateLink />
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
