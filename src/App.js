import React from 'react';
import './App.css';
import Tennis from './tennis/tennis';

function App() {
  return (
    <div className="App">
      <h1>Tennis Tournament Scoring App</h1>
      <a href='https://www.akberiqbal.com'>
        <h2>
          Akber Iqbal
          </h2>
      </a>
      <hr />
      <Tennis />
    </div>
  );
}

export default App;
