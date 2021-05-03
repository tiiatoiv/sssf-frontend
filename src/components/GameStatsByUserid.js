//import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { AUTH_USERNAME } from '../constants';
import { useHistory } from 'react-router';

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
      <div style={{ backgroundColor: 'lightgray', display: "flex", alignItems: "center", flexDirection: "row", display : "inline-block"}}>
      <Row>
      <div style={{backgroundColor: "white", margin: "10px", padding: "20px", width: "200px"}} key={gameResult}>
      
        <h2> { userID } </h2>
        <h3>End result | Agent | Map</h3>
             <p>
          {gameResult} : {agent.agentName} : {map.mapName ? map.mapName : "Jotai muuta tekstii mitä haluut tilalle"}
        </p>
        <h3>Kills, Deaths, Assist</h3>
        <p>
          {kills} : {deaths} : {assist}
        </p>
        <button onClick={(e)=> 
          clickDelete(id)
          }>
                Delete
            </button>
        </div>
        </Row>
        </div>
    ));
  }
  }
  export default GameStatsByUser;