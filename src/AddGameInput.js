import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const CREATE_GAMESTAT = gql`
mutation AddGameStat($gameResult: String!, $agent: String!, $map: ID!, $kills: String!, $deaths: String!, $assist: String!) {
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

const AddGameInput = () => {
    const [gameResult, setGameResult] = useState('');
    const [agent, setAgent] = useState('');
    const [map, setMap] = useState('');
    const [kills, setKills] = useState('');
    const [deaths, setDeaths] = useState('');
    const [assist, setAssist] = useState('');

    const [addGameStat] = useMutation(CREATE_GAMESTAT, { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});
    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          addGameStat({variables: {gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
          console.log( gameResult, kills );
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={gameResult}
            onChange={e => (setGameResult(e.target.value))}
            type="text"
            placeholder="Game result"
          />
          <input
            className="mb2"
            value={agent}
            onChange={e => (setAgent(e.target.value))}
            type="text"
            placeholder="Agent"
          />
          <input
            className="mb2"
            value={map}
            onChange={e => (setMap(e.target.value))}
            type="text"
            placeholder="Map"
          />
          <input
            className="mb2"
            value={kills}
            onChange={e => (setKills(e.target.value))}
            type="text"
            placeholder="Kills"
          />
          <input
            className="mb2"
            value={deaths}
            onChange={e => (setDeaths(e.target.value))}
            type="text"
            placeholder="Deaths"
          />
          <input
            className="mb2"
            value={assist}
            onChange={e => (setAssist(e.target.value))}
            type="text"
            placeholder="Assist"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default AddGameInput;