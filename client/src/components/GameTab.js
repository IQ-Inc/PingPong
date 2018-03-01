import React, { Component } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Glyphicon
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
    this.moveOrder = this.moveOrder.bind(this);
  }

  addPlayerToEnd = (player) => {
    this.setState({
      ...this.state,
      activePlayers: [...this.state.activePlayers,  player]
    });
  }

  addPlayerToBeginning = (player) => {
    if(this.state.activePlayers.map(p=>p.id).indexOf(player.id) === -1) {
      this.setState({
        ...this.state,
        activePlayers: [ player, ...this.state.activePlayers]
      });
    }    
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

  moveOrder = (index, up) => {
    if((up && index === 0) || (!up && index === (this.state.activePlayers.length - 1))) {
      return;
    }
    if(up)
      this.swapPlayers(index, index -1);
    else  
      this.swapPlayers(index, index + 1);
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
    player.GamesWon = this.props.games.filter(g => g.WinnerId === player.id);
    player.GamesLost = this.props.games.filter(g => g.LoserId === player.id);
    this.setState({
      ...this.state,
      player1: {...player}
    });
  }

  selectPlayer2 = (player) => {
    player.GamesWon = this.props.games.filter(g => g.WinnerId === player.id);
    player.GamesLost = this.props.games.filter(g => g.LoserId === player.id);
    this.setState({
      ...this.state,
      player2: {...player}
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
    
    this.setState({
      ...this.state,
      player2Score: 0,
      player1Score: 0,
    });
    if(playerOneWon) 
      this.selectPlayer2(this.state.activePlayers[skipAgain ? 1 : 0]);
    else 
      this.selectPlayer1(this.state.activePlayers[skipAgain ? 1 : 0]);
    
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

  skipPlayer = (skippingOne) => {
    if(skippingOne) {
      this.movePlayerToEnd(this.state.player1);
      this.nextPlayer(false); 
    }
    else {
      this.movePlayerToEnd(this.state.player2);
      this.nextPlayer(true);
    }
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
      let playerWon = this.state.player2;
      if(playerOneWon) {
        playerLost = this.state.player2;
        playerWon = this.state.player1;
      }
      this.movePlayerToEnd(playerLost);
      this.movePlayerToEnd(playerWon);
      this.nextPlayer(playerOneWon);
    });
  }

  formatPlayerString = (player) => {
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
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer1(false)}>-</Col>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer1(true)}>+</Col>
            </Row>
          </Col>                 
          <Col className="game-middle-col" md={2}>
            <Row className="submit-game-button" onClick={this.submitGame}>Submit</Row>
            {this.state.activePlayers.map((player, index) =>                 
                <Row className="active-player" key={player.id}>
                  <Col className="move-order-glyph" onClick={() => this.moveOrder(index, false)} md={2}>
                    <Glyphicon glyph="menu-down" />
                  </Col>
                  <Col md={8}>
                    {player.FirstName + " " + player.LastName}
                  </Col>
                  <Col className="move-order-glyph" onClick={() => this.moveOrder(index, true)} md={2}>
                    <Glyphicon glyph="menu-up" />
                  </Col>
                </Row>
            )}
          </Col> 
          <Col className="player-area two" md={5}> 
            <Row className="player-name">{this.formatPlayerString(this.state.player2)}</Row>    
            <Row className="score">{this.state.player2Score}</Row>
            <Row>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer2(false)}>-</Col>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer2(true)}>+</Col>
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
                  return {...player, value: player.id, label: player.FirstName + " " + player.LastName };
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
                  return {...player, value: player.id, label: player.FirstName + " " + player.LastName };
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
                  return {...player, value: player.id, label: player.FirstName + " " + player.LastName };
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
