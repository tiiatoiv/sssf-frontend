//import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Row } from 'react-bootstrap';
import { AUTH_USERNAME } from '../constants';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const GET_GAMESTATSBYUSER = gql`
  query GetGameStatsByUserID(
    $userID: String!
    ) {
      gamestatsbyuser (
        userID: $userID
    ) {
      userID
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

const GET_GAMESTATS = gql`
  query GetGameStats {
    gamestats {
      userID
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
  const currentUser = localStorage.getItem(AUTH_USERNAME);
  console.log("TÄMÄ LOCS", currentUser);
    const { loading, error, data } = useQuery(GET_GAMESTATSBYUSER,
      { variables: {
       userID: currentUser
      },
    });
    console.log("TÄMÄ USID", data);
    console.log(currentUser);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  if (data){
    return data.gameStatsByUser.map(({ userID, gameResult, agent, map, kills, deaths, assist }) => 
    (
      <div style={{ display: "flex", alignItems: "center", flexDirection: "row", display : "inline-block"}}>
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
        </div>
        </Row>
        </div>
    ));
  }
  }
  export default GameStatsByUser;