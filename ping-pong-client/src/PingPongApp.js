import React, { Component } from 'react';
import logo from './images/logo.svg';
import './style/App.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Button, 
  FormControl, 
  FormGroup,
  Row,
  Col
} from 'react-bootstrap';

class PingPongApp extends Component {
  constructor() {
  	super();
    this.state={
      players:[], 
      selectedPlayer1: null,
      selectedPlayer2: null
    };
  }
  selectPlayer1 = (player) => {
    this.setState({
      ...this.state,
      selectedPlayer1: player
    });
  }
  selectPlayer2 = (player) => {
    this.setState({
      ...this.state,
      selectedPlayer2: player
    });
  }
  
  componentDidMount() {    
    fetch(`http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/players`)
      .then(result=>result.json())
      .then(players=> {
        this.setState({
          ...this.state,
          players: [...players]
        });        
      })
  }

  createPlayer = (player) => {
    fetch('http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: this.FirstName.value,
        LastName: this.LastName.value,
      })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Ping Pong App</h1>
        </header>
        <Row>
          <Col md={6}>
            Choose Player 1
            <Select
              name="form-field-name"
              value={this.state.selectedPlayer1}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer1}
              options={this.state.players.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>
          <Col md={6}>    
            Choose Player 2
            <Select
              name="form-field-name"
              value={this.state.selectedPlayer2}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer2}
              options={this.state.players.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>
        </Row>
        <Row>
        <form onSubmit={this.createPlayer}>
          <Col md={4}>
            <FormGroup>
              <FormControl placeholder="First Name" inputRef={ref => { this.FirstName = ref; }} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <FormControl placeholder="Last Name" inputRef={ref => { this.LastName = ref; }} />
            </FormGroup>
          </Col>
          <Col md={4}><Button type="submit">Create Player</Button></Col>
        </form>
        </Row>
      </div>
    );
  }
}

export default PingPongApp;
