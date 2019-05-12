/**
 * Author: Youwei Yang
 * Description: This is a web app that allows the user to add, rate, and
 *              view the rating for anime series and movies
 */
import React, { Component } from 'react';
import './App.css';
import RateMe from './components/rateMe/rateMe'

/**
 * the main app component that
 */
class App extends Component {
  /**
   * render the app component
   */
  render() {
    return (
      <div className="App">
        <RateMe />
      </div>
    );
  }
}

export default App;
