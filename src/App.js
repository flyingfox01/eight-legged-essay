import logo from './logo.svg';
import './App.css';
// import './002-closure';
// import './003-event-loop';
import Demo5 from './005-two-way-data-binding.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Demo5 />
      </header>
    </div>
  );
}

export default App;
