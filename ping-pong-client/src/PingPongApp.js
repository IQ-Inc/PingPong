import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PingPongApp extends Component {
  constructor() {
  	super();
    this.state={players:[]};
  }
  componentDidMount() {    
    fetch(`http://node-express-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/players`)
      .then(result=>result.json())
      .then(players=> {
        this.setState({
          ...this.state,
          players: players
        });        
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul className="App-intro">
          {this.state.players.map(player =>
            <li key={player.id}>{player.FirstName + " " + player.LastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default PingPongApp;
