import logo from './logo.svg';
import './App.css';
// import './002-closure';
// import './003-event-loop';
// import Demo from './005-two-way-data-binding';
// import Demo from './005-pub-sub';
// import Demo from './006-debounce.js';
import Demo from './006-throttle.js';
// import './007-multi-request.ts';
// import './008-delete-min-count-char';
// import './009-array-2-tree';
import './010-number-chinesize';

// import './Vue/index.ts';

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
        <Demo />
      </header>
    </div>
  );
}

export default App;
