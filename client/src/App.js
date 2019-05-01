import React, { Component } from 'react';
import './App.css';
import RateMe from './components/rateMe/rateMe'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Rate Me
        </header>
        <RateMe />
      </div>
    );
  }
}

export default App;
