
//import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Row } from 'react-bootstrap';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const GET_GAMESTATS = gql`
  query GetGameStats {
    gamestats {
      userID
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

const GET_GAMESTATSBYUSER = gql`
  query getGameStatsByUser {
    gameStatsByUser
    (id:"testuser") {
      userID
      gameResult
      agent
      map {
        id
        mapName
      }
    }
  }
`;


function GameStats() {
    const { loading, error, data } = useQuery(GET_GAMESTATS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.gamestats.map(({ userID, gameResult, agent, map, kills, deaths, assist }) => 
    (
      <div style={{ display: "flex", alignItems: "center", flexDirection: "row", display : "inline-block"}}>
      <Row>
      <div style={{backgroundColor: "white", margin: "10px", padding: "20px", width: "200px"}} key={gameResult}>
      
        <h2> { userID } </h2>
        <h3>End result | Agent | Map</h3>
        <img src={require('./images/' + agent + '.jpg')} alt="Logo" style={{ width: '100px '}}/>;
        <img src={require('./images/' + map.mapName + '.jpg')} alt="Logo" style={{ width: '100px '}}/>;
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
  export default GameStats;