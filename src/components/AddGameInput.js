import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import FormControl from 'react-bootstrap';
import { AUTH_TOKEN, AUTH_USERNAME } from '../constants';
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
    const [agent, setAgent] = useState('608af1308115651299266c9b');
    const [map, setMap] = useState('608af1e88115651299266c9c');
    const [kills, setKills] = useState('');
    const [deaths, setDeaths] = useState('');
    const [assist, setAssist] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const currentUsername = localStorage.getItem(AUTH_USERNAME);

    const [addGameStat] = useMutation(CREATE_GAMESTAT,
      { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});
    return (
      <div style={{alignItems: 'center'}}>
        <form style={{margin: "10px", padding: "10px"}}
        onSubmit={(e) => {
          e.preventDefault();
          addGameStat({variables: {userID: currentUsername, gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
          console.log( gameResult, kills );
          history.push('/');
          window.location.reload();
        }}
      >
        <div className="addform">
          <h1 style={{fontSize: '20px'}}>Add stat</h1>
          <h2 style={{marginTop: '40px'}}>UserID for submit: {currentUsername}</h2>
          <input
            className="mb2"
            value={gameResult}
            onChange={e => (setGameResult(e.target.value))}
            type="text"
            placeholder="Game result (e.g. 13-1)"
          />
          <select
            className="selectfield"
            value={agent}
            onChange={e => (setAgent(e.target.value))}>
            <option selected value="608af1308115651299266c9b">Killjoy</option>
            <option value="608c13717b69cca488f2eef0">Cypher</option>
            <option value="608ff106db276dc3a5908cf9">Sova</option>
            <option value="608ff13bdb276dc3a5908cfa">Omen</option>
            <option value="60901ba1506075ce80ec620e">Jett</option>
            <option value="60901baf506075ce80ec620f">Reyna</option>

          </select>
          <select
            className="selectfield"
            value={map}
            onChange={e => (setMap(e.target.value))}>
            <option selected value="608af1e88115651299266c9c">Ascent</option>
            <option value="608c13847b69cca488f2eef1">Bind</option>
            <option value="608ff2b6db276dc3a5908cfb">Split</option>
            <option value="608ff2c2db276dc3a5908cfc">Haven</option>
            <option value="608ff2cedb276dc3a5908cfd">Icebox</option>

          </select>
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