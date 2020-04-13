import React from 'react';
import './App.css';
import Companies from './Companies'
import Prices from './Prices'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Companies />
        <Prices />
      </div>
    </div>
  );
}

export default App;
