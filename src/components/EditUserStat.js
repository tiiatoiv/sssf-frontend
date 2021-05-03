import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import FormControl from 'react-bootstrap';
import { AUTH_TOKEN, AUTH_USERNAME, CURRENT_EDITIT } from '../constants';
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

const EDIT_GAMESTAT = gql`
mutation EditGameStat($id: ID!, $userID: String!, $gameResult: String!, $agent: ID!, $map: ID!, $kills: String!, $deaths: String!, $assist: String!) {
  modifyGameStat(id: $id, userID: $userID, gameResult: $gameResult, agent: $agent, map: $map, kills: $kills, deaths: $deaths, assist: $assist) {
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

const EditUserStat = () => {
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
    const id = localStorage.getItem(CURRENT_EDITIT);

    const [addGameStat] = useMutation(CREATE_GAMESTAT,
      { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});
    
    
const [editGameStat] = useMutation(EDIT_GAMESTAT, {
    variables: {
    id: id },
},
    { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});
  
    const clickSaveEdit = (id) =>  {
      console.log("TÄMÄ EDIT", id);
      editGameStat({variables: {id: id, userID: currentUsername, gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
    }
  
    
    
    
      return (
            <div style={{alignItems: 'center'}}>
              <form style={{margin: "10px", padding: "10px"}}
              onSubmit={(e) => {
                e.preventDefault();
                editGameStat({variables: {userID: currentUsername, gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
                console.log( gameResult, kills );
                history.push('/');
              }}
            >
              <div className="addform">
                <h1 style={{fontSize: '20px'}}>Edit stat</h1>
                <p style={{fontSize: '16px'}}>For now when selecting an agent or a map, if you want to select the default value, please select the other one and then the default again. :p</p>
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
                  <option value="608af1308115651299266c9b">Killjoy</option>
                  <option value="608c13717b69cca488f2eef0">Cypher</option>

                </select>
                <select
                  className="selectfield"
                  value={map}
                  onChange={e => (setMap(e.target.value))}>
                  <option value="608af1e88115651299266c9c">Ascent</option>
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
                <button onClick={(e)=> 
                clickSaveEdit(id)
                }><h2>
              Edit</h2>
          </button>
              </div>
            </form>
            </div>
      )
  };
  
  export default EditUserStat;