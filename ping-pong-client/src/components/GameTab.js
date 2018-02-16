import React, { Component } from 'react';
import axios from 'axios';
import { Button, 
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
    };   

    this.selectPlayer1 = this.selectPlayer1.bind(this);
    this.selectPlayer2 = this.selectPlayer2.bind(this);
  }

  selectPlayer1 = (player) => {
    axios.get(server_url + "api/players/" + player.value).then(res=>{
      this.setState({
        ...this.state,
        player1: res.data
      });
    });
  }

  selectPlayer2 = (player) => {
    axios.get(server_url + "api/players/" + player.value).then(res=>{
      this.setState({
        ...this.state,
        player2: res.data
      });
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

  resetAfterWin = (playerOneWon) => {
    if(playerOneWon) {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player2: {id: 0}
      });
    }
    else {
      this.setState({
        ...this.state,
        player2Score: 0,
        player1Score: 0,
        player1: {id: 0}
      });
    }
  }

  submitGame = () => {
    let game = {
      WinnerId: this.state.player1Score > this.state.player2Score ? this.state.player1.value : this.state.player2.value,
      LoserId: this.state.player1Score > this.state.player2Score ? this.state.player2.value : this.state.player1.value,
      WinnerScore: this.state.player1Score > this.state.player2Score ? this.state.player1Score : this.state.player2Score,
      LoserScore: this.state.player1Score > this.state.player2Score ? this.state.player2Score : this.state.player1Score,
      IsTournamentGame: false,
    };
    console.log(game);
    axios.post(server_url + "api/games", game).then(res=>{
      this.props.loadGames();
      this.resetAfterWin(this.state.player1Score > this.state.player2Score);
    });
  }

  formatPlayerString = (player) => {
    console.log(player);
    return player.id === 0 ? "Select Player" : player.FirstName + " " + player.LastName + " " + player.GamesWon.length + "W" + player.GamesLost.length + "L";
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="player-area one" md={6}> 
            <Row className="player-name">{this.formatPlayerString(this.state.player1)}</Row>           
            <Row className="score">{this.state.player1Score}</Row>
            <Row>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer1(false)}>-</Col>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer1(true)}>+</Col>
            </Row>
          </Col>
          <Col className="player-area two" md={6}> 
            <Row className="player-name">{this.formatPlayerString(this.state.player2)}</Row>    
            <Row className="score">{this.state.player2Score}</Row>
            <Row>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer2(false)}>-</Col>
              <Col md={6} className="score-button" onClick={() =>this.scorePlayer2(true)}>+</Col>
            </Row>
          </Col>
        </Row>   
        <Row>                    
          <Col className="submit-game-button-row" md={12}>
            <Button className="submit-game-button" onClick={this.submitGame}>Submit Game</Button>
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
