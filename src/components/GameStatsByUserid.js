//import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { AUTH_TOKEN, AUTH_USERNAME } from '../constants';
import { useHistory } from 'react-router';
import './login.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const GET_GAMESTATSBYUSER = gql`
  query GetGameStatsByUserID(
    $userID: String!
    ) {
      gameStatsByUser (
        userID: $userID,
    ) {
      id
      gameResult
      agent {
        id
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

export const DELETE_STAT = gql`
    mutation deleteStat($id: ID!){
      deleteGameStat(id: $id){
        gameResult
        agent {
          id
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
mutation EditGameStat($userID: String!, $gameResult: String!, $agent: ID!, $map: ID!, $kills: String!, $deaths: String!, $assist: String!) {
  modifyGameStat(userID: $userID, gameResult: $gameResult, agent: $agent, map: $map, kills: $kills, deaths: $deaths, assist: $assist) {
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

function GameStatsByUser() {
  const history = useHistory();
  const userID = localStorage.getItem(AUTH_USERNAME);
  const [deleteid, setDeleteid] = useState("");
  const [editing, setEditing] = useState(false);
  const [gameResult, setGameResult] = useState('');
    const [agent, setAgent] = useState('');
    const [map, setMap] = useState('');
    const [kills, setKills] = useState('');
    const [deaths, setDeaths] = useState('');
    const [assist, setAssist] = useState('');
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const currentUsername = localStorage.getItem(AUTH_USERNAME);

  console.log("TÄMÄ LOCS", userID);

  const [deleteStat] = useMutation(DELETE_STAT, {
    variables: {
      id: deleteid,
    },
    onCompleted: ({deleteStat}) => {
        console.log('delete stat');
        history.push('/profile');
        window.location.reload();
      
    },
    onError(error) {
      console.log("TÄMÄ DELE", deleteid)
        console.log(error);
    }
});

const [editGameStat] = useMutation(EDIT_GAMESTAT,
  { onError: ({ graphQLErrors }) => console.log("TÄMÄ VIRHE", graphQLErrors)});

const clickDelete = (id) => {
  console.log("TÄMÄ DELT", id)
  setDeleteid(id);
  console.log("TÄMÄ DELK", deleteid);
  deleteStat();
  };

  const clickEdit = (id) =>  {
    console.log("TÄMÄ EDIT", id);
    setEditing(true);
  }

  const clickSaveEdit = (id) =>  {
    console.log("TÄMÄ EDIT", id);
    editGameStat({variables: {id: id, userID: currentUsername, gameResult: gameResult, agent: agent, map: map, kills: kills, deaths: deaths, assist: assist }});
  }


    const { loading, error, data } = useQuery(GET_GAMESTATSBYUSER, {
      variables: {
        userID: userID,
      },
    });
    console.log("TÄMÄ USDA", data);
    console.log(userID);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  if (data){
    return data.gameStatsByUser.map(({ id, userID, gameResult, agent, map, kills, deaths, assist }) => 
    (
      <div className="statdiv" style={{ backgroundColor: 'lightgray', display: "flex", alignItems: "center", flexDirection: "row", display : "inline-block"}}>
      <Row>
      <div style={{backgroundColor: "white", margin: "10px", padding: "30px", width: "200px"}} key={gameResult}>
      
        <h2> { userID } </h2>
        <h3>End result | Agent | Map</h3>
             <p className="resultsp">
          {gameResult} | {agent.agentName} | {map.mapName ? map.mapName : "Jotai muuta tekstii mitä haluut tilalle"}
        </p>
        <h3>Kills, Deaths, Assist</h3>
        <p className="resultsp">
          {kills} | {deaths} | {assist}
        </p>
        <button style={{backgroundColor: 'rgb(255, 60, 60)'}} onClick={(e)=> 
          clickDelete(id)
          }><h2>
                Delete</h2>
            </button>
            <button onClick={(e)=> 
          clickEdit(id)
          }><h2>
                Edit</h2>
            </button>

            {editing ? 
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
              </div> : <p></p>}
        </div>
        </Row>
        </div>
    ));
  }
  }
  export default GameStatsByUser;