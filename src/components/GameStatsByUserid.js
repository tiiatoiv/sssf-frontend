//import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { AUTH_TOKEN, AUTH_USERNAME, CURRENT_EDITIT, CURRENT_GAMESTATCOUNT } from '../constants';
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
    const cuurentGameStatCount = localStorage.getItem(CURRENT_GAMESTATCOUNT);

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

const clickDelete = (id) => {
  console.log("TÄMÄ DELT", id)
  setDeleteid(id);
  console.log("TÄMÄ DELK", deleteid);
  deleteStat();
  };

  const clickEdit = (id) =>  {
    console.log("TÄMÄ EDIT", id);
    localStorage.setItem(CURRENT_EDITIT, id);
    const currentEditId = localStorage.getItem(CURRENT_EDITIT);
    console.log("TÄMÄ SETI", currentEditId);
    history.push('./edit');
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
    localStorage.setItem(CURRENT_GAMESTATCOUNT, data.gameStatsByUser.length);
    console.log("TÄMÄ PITU", data.gameStatsByUser.length);
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

        </div>
        </Row>
        </div>
    ));
  }
  }
  export default GameStatsByUser;