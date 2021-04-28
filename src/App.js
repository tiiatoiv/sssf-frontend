import logo from './logo.svg';
import './App.css';
import AddGameInput from './components/AddGameInput.js';
import GameStats from './components/GameStats.js';
import Header from './components/Header.js';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h2>Jee</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Header/>
        <AddGameInput />
        <GameStats />
      </header>
    </div>
  );
}

export default App;