import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import FormControl from 'react-bootstrap';
import { AUTH_TOKEN } from '../constants';
import { useHistory } from 'react-router';
import './addgameinput.css';

const CREATE_GAMESTAT = gql`
mutation AddGameStat($userID: String!, $gameResult: String!, $agent: ID!, $map: ID!, $kills: String!, $deaths: String!, $assist: String!) {
 addGameStat(userID: $userID, gameResult: $gameResult, agent: $agent, map: $map, kills: $kills, deaths: $deaths, assist: $assist) {
   id
   userID
   gameResult
   agent {
     agentName
     agentType
   }
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
    const history = useHistory();
    const [userID, setUserID] = useState('');
    const [gameResult, setGameResult] = useState('');
    const [agent, setAgent] = useState('');
    const [map, setMap] = useState('');
    const [kills, setKills] = useState('');
    const [deaths, setDeaths] = useState('');
    const [assist, setAssist] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);

    const [addGameStat] = useMutation(CREATE_GAMESTAT,
      { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});
    return (
      <div style={{alignItems: 'center'}}>
        <form style={{margin: "10px", padding: "10px"}}
        onSubmit={(e) => {
          e.preventDefault();
          addGameStat({variables: {userID: userID, gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
          console.log( gameResult, kills );
          history.push('/');
        }}
      >
        <div className="addform">
          <h1 style={{fontSize: '20px'}}>Add stat</h1>
          <input
              className="mb2"
              value={userID}
              onChange={e => (setUserID(e.target.value))}
              type="text"
              placeholder="Your username"
            />
          <input
            className="mb2"
            value={gameResult}
            onChange={e => (setGameResult(e.target.value))}
            type="text"
            placeholder="Game result (e.g. 13-1)"
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
          <button className="submitbutton" type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  };
  
  export default AddGameInput;