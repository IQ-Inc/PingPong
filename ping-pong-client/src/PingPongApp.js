import React, { Component } from 'react';
import logo from './images/logo.svg';
import './style/App.css';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import CreatePlayerTab from './components/CreatePlayerTab';
import GameTab from './components/GameTab';
import StatisticsTab from './components/StatisticsTab';
import { Button, 
  FormControl, 
  FormGroup,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap';

class PingPongApp extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      games: []
    }
    this.loadGames = this.loadGames.bind(this);
    this.loadPlayers = this.loadGames.bind(this);
  }
  
  componentDidMount() {  
    this.loadPlayers();
    this.loadGames();
  }

  loadGames() {  
    axios.get(`http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/games`)
      .then(res => {
        this.setState({
          ...this.state,
          games: [...res.data]
        })      
      })
    
  }

  loadPlayers() {
    axios.get(`http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/players`)
      .then(res => {
        this.setState({
          ...this.state,
          players: [...res.data]
        }) 
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Ping Pong App</h1>
        </header>        
        <Tabs defaultActiveKey={1} id="ping-pong-tabs">
          <Tab eventKey={1} title="Game"> 

            <GameTab 
              players={this.state.players}
              loadGames={this.loadGames}
            />

          </Tab>
          <Tab eventKey={2} title="Create Player"> 

            <CreatePlayerTab
              loadPlayers={this.loadPlayers}
            />

          </Tab>
          <Tab eventKey={3} title="Statistics"> 

            <StatisticsTab 
              games={this.state.games} 
            />

          </Tab>
        </Tabs>          
      </div>
    );
  }
}

export default PingPongApp;
