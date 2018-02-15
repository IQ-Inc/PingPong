import React, { Component } from 'react';
import axios from 'axios';
import { Button, 
  FormControl, 
  FormGroup,
  Row,
  Col,
  Tab,
} from 'react-bootstrap';
import Select from 'react-select';

class GameTab extends Component {
  constructor() {
    super();
    this.state={
      selectedPlayer1: null,
      selectedPlayer2: null,
      player1Score: 0,
      player2Score: 0
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
  
  scorePlayer1 = (up) => {
    if(!up && this.state.player1Score == 0)
      return;
    this.setState( {
      ...this.state,
      player1Score: up ? this.state.player1Score + 1 : this.state.player1Score - 1
    })
  }

  scorePlayer2 = (up) => {
    if(!up && this.state.player2Score == 0)
      return;
    this.setState( {
      ...this.state,
      player2Score: up ? this.state.player2Score + 1 : this.state.player2Score - 1
    })
  }

  submitGame = () => {
    let game = {
      WinnerId: this.state.player1Score > this.state.player2Score ? this.state.selectedPlayer1.value : this.state.selectedPlayer2.value,
      LoserId: this.state.player1Score > this.state.player2Score ? this.state.selectedPlayer2.value : this.state.selectedPlayer1.value,
      WinnerScore: this.state.player1Score > this.state.player2Score ? this.state.player1Score : this.state.player2Score,
      LoserScore: this.state.player1Score > this.state.player2Score ? this.state.player2Score : this.state.player1Score,
      IsTournamentGame: false,
    };
    console.log(game);
    axios.post('http://localhost:8081/api/games', game).then(res=>{
      this.props.loadGames();
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col className="player-area one" md={6}>
            <Row className="player-select">
              <Select
                name="form-field-name"
                placeholder="Select Player"
                value={this.state.selectedPlayer1}
                searchable={true}
                clearable={true}
                onChange={this.selectPlayer1}
                options={this.props.players.map(player => 
                  {
                    return {value: player.id, label: player.FirstName + " " + player.LastName };
                  }
                )}
              />
            </Row>
            <Row className="score">{this.state.player1Score}</Row>
            <Row>
              <Col className="up-button" onClick={() =>this.scorePlayer1(true)}>+</Col>
              <Col className="down-button" onClick={() =>this.scorePlayer1(false)}>-</Col>
            </Row>
          </Col>
          <Col className="player-area two" md={6}> 
            <Row className="player-select">
              <Select
                name="form-field-name"
                placeholder="Select Player"
                value={this.state.selectedPlayer2}
                searchable={true}
                clearable={true}
                onChange={this.selectPlayer2}
                options={this.props.players.map(player => 
                  {
                    return {value: player.id, label: player.FirstName + " " + player.LastName };
                  }
                )}
              />
            </Row>
            <Row className="score">{this.state.player2Score}</Row>
            <Row>
              <Col className="up-button" onClick={() =>this.scorePlayer2(true)}>+</Col>
              <Col className="down-button" onClick={() =>this.scorePlayer2(false)}>-</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.submitGame}>Submit Game</Button>
        </Row>
      </div>
    );
  }
}

export default GameTab;
