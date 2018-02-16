import React, { Component } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
} from 'react-bootstrap';
import Select from 'react-select';
import {
  server_url
} from '../static/constants';

class GameTab extends Component {
  constructor() {
    super();
    this.state={
      player1Score: 0,
      player2Score: 0,
      player1: {id: 0},
      player2: {id: 0},
      activePlayers: [],
      nextPlayer: 0
    };   

    this.selectPlayer1 = this.selectPlayer1.bind(this);
    this.selectPlayer2 = this.selectPlayer2.bind(this);
    this.addPlayerToEnd = this.addPlayerToEnd.bind(this);
  }

  addPlayerToEnd = (player) => {
    this.setState({
      ...this.state,
      activePlayers: [...this.state.activePlayers,  player]
    });
  }

  selectPlayer1 = (player) => {
    axios.get(server_url + "api/players/" + player.value).then(res=>{
      this.setState({
        ...this.state,
        player1: res.data
      });
      if(this.state.activePlayers.map(p=>p.id).indexOf(res.data.id) === -1) {
        this.addPlayerToEnd(res.data);
      }
    });
  }

  selectPlayer2 = (player) => {
    axios.get(server_url + "api/players/" + player.value).then(res=>{
      this.setState({
        ...this.state,
        player2: res.data
      });
      if(this.state.activePlayers.map(p=>p.id).indexOf(res.data.id) === -1) {
        this.addPlayerToEnd(res.data);
      }
    });
  }
  
  scorePlayer1 = (up) => {
    if(!up && this.state.player1Score === 0)
      return;
    this.setState( {
      ...this.state,
      player1Score: up ? this.state.player1Score + 1 : this.state.player1Score - 1
    })
  }

  scorePlayer2 = (up) => {
    if(!up && this.state.player2Score === 0)
      return;
    this.setState( {
      ...this.state,
      player2Score: up ? this.state.player2Score + 1 : this.state.player2Score - 1
    })
  }

  nextPlayer = (playerOneWon) => {
    if(playerOneWon) {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player2: this.state.activePlayers[0],
      });
      this.selectPlayer1({value: this.state.player1.id});
    }
    else {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player1: this.state.activePlayers[0],
      });
      this.selectPlayer2({value: this.state.player2.id});
    }
    let newArray = JSON.parse(JSON.stringify(this.state.activePlayers));
    var temp = newArray.shift();
    newArray.push(temp);
    this.setState({
      ...this.state,
      activePlayers: newArray
    });
  }

  submitGame = () => {
    let game = {
      WinnerId: this.state.player1Score > this.state.player2Score ? this.state.player1.id : this.state.player2.id,
      LoserId: this.state.player1Score > this.state.player2Score ? this.state.player2.id : this.state.player1.id,
      WinnerScore: this.state.player1Score > this.state.player2Score ? this.state.player1Score : this.state.player2Score,
      LoserScore: this.state.player1Score > this.state.player2Score ? this.state.player2Score : this.state.player1Score,
      IsTournamentGame: false,
    };
    axios.post(server_url + "api/games", game).then(res=>{
      this.props.loadGames();
      this.nextPlayer(this.state.player1Score > this.state.player2Score);
    });
  }

  formatPlayerString = (player) => {
    console.log(player);
    return player.id === 0 ? 
      "Select Player" 
      : 
      player.FirstName + " " + player.LastName + " " + player.GamesWon.length + "W" + player.GamesLost.length + "L\n";
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="player-area one" md={5}> 
            <Row className="player-name">{this.formatPlayerString(this.state.player1)}</Row>           
            <Row className="score">{this.state.player1Score}</Row>
            <Row>
              <Col md={2} onClick={() =>this.nextPlayer(false)} className="skip score-button">SKIP</Col>
              <Col md={5} className="score-button" onClick={() =>this.scorePlayer1(false)}>-</Col>
              <Col md={5} className="score-button" onClick={() =>this.scorePlayer1(true)}>+</Col>
            </Row>
          </Col>                 
          <Col className="game-middle-col" md={2}>
            <Row className="submit-game-button" onClick={this.submitGame}>Submit</Row>
            {this.state.activePlayers.map(player =>                 
                <Row className="active-player" key={player.id}>{player.FirstName + " " + player.LastName}</Row>
            )}
          </Col> 
          <Col className="player-area two" md={5}> 
            <Row className="player-name">{this.formatPlayerString(this.state.player2)}</Row>    
            <Row className="score">{this.state.player2Score}</Row>
            <Row>
              <Col md={5} className="score-button" onClick={() =>this.scorePlayer2(false)}>-</Col>
              <Col md={5} className="score-button" onClick={() =>this.scorePlayer2(true)}>+</Col>
              <Col md={2} onClick={() =>this.nextPlayer(false)} className="skip score-button">SKIP</Col>
            </Row>
          </Col>
        </Row> 
        <Row>
          <Col md={6} className="player-select">
            <Select
              name="form-field-name"
              placeholder="Select Player"
              value={this.state.player1.id}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer1}
              options={this.props.players.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>
          <Col md={6} className="player-select">
            <Select
              name="form-field-name"
              placeholder="Select Player"
              value={this.state.player2.id}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer2}
              options={this.props.players.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default GameTab;
