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
      addPlayer: {id: 0},
      player2: {id: 0},
      activePlayers: [],
      nextPlayer: 0
    };   

    this.selectPlayer1 = this.selectPlayer1.bind(this);
    this.selectPlayer2 = this.selectPlayer2.bind(this);
    this.addPlayerToEnd = this.addPlayerToEnd.bind(this);
    this.addPlayerToBeginning = this.addPlayerToBeginning.bind(this);
    this.movePlayerToEnd = this.movePlayerToEnd.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.swapPlayers = this.swapPlayers.bind(this);
  }

  addPlayerToEnd = (player) => {
    this.setState({
      ...this.state,
      activePlayers: [...this.state.activePlayers,  player]
    });
  }

  addPlayerToBeginning = (player) => {
    this.setState({
      ...this.state,
      activePlayers: [ player, ...this.state.activePlayers]
    });
  }

  swapPlayers = (index1, index2) => {
    let newArray = JSON.parse(JSON.stringify(this.state.activePlayers));
    let temp = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = temp;
    this.setState({
      ...this.state,
      activePlayers: newArray
    });
  }

  movePlayerToEnd = (player) => {
    let currentIndex = this.state.activePlayers.map(p=>p.id).indexOf(player.id);
    let newArray = JSON.parse(JSON.stringify(this.state.activePlayers));
    let movingPlayer = newArray.splice(currentIndex, 1);
    newArray.push(movingPlayer[0]);
    this.setState({
      ...this.state,
      activePlayers: newArray
    })
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
    let skipAgain = (playerOneWon && this.state.player1.id === this.state.activePlayers[0].id) || (!playerOneWon && this.state.player2.id === this.state.activePlayers[0].id);
    
    if(playerOneWon) {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player2: this.state.activePlayers[skipAgain ? 1 : 0],
      });
      this.selectPlayer1({value: this.state.player1.id});
      this.selectPlayer2({value:  this.state.activePlayers[skipAgain ? 1 : 0]});
    }
    else {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player1: this.state.activePlayers[skipAgain ? 1 : 0],
      });
      this.selectPlayer2({value: this.state.player2.id});
      this.selectPlayer1({value:  this.state.activePlayers[skipAgain ? 1 : 0]});
    }
    let newArray = JSON.parse(JSON.stringify(this.state.activePlayers));
    var temp = newArray.shift();
    newArray.push(temp);
    if(skipAgain) {
      temp = newArray.shift();
      newArray.push(temp);
    }
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
      let playerOneWon = this.state.player1Score > this.state.player2Score;
      let playerLost = this.state.player1;
      if(playerOneWon)
        playerLost = this.state.player2;
      this.movePlayerToEnd(playerLost);
      this.nextPlayer(playerOneWon);
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
          <Col md={4} className="player-select">
            <Select
              name="form-field-name"
              placeholder="Select Player 1"
              value={this.state.player1.id}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer1}
              options={this.state.activePlayers.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>          
          <Col md={4} className="player-select">
            <Select
              name="form-field-name"
              placeholder="Add Player To List"
              value={this.state.addPlayer.id}
              searchable={true}
              clearable={true}
              onChange={this.addPlayerToBeginning}
              options={this.props.players.map(player => 
                {
                  return {value: player.id, label: player.FirstName + " " + player.LastName };
                }
              )}
            />
          </Col>
          <Col md={4} className="player-select">
            <Select
              name="form-field-name"
              placeholder="Select Player 2"
              value={this.state.player2.id}
              searchable={true}
              clearable={true}
              onChange={this.selectPlayer2}
              options={this.state.activePlayers.map(player => 
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
