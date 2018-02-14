import React, { Component } from 'react';
import axios from 'axios';
import { Button, 
  FormControl, 
  FormGroup,
  Row,
  Col,
  Tab
} from 'react-bootstrap';
import Select from 'react-select';

class GameTab extends Component {
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

  submitGame = () => {
    let game = {
      WinnerId: this.player1Score.value > this.player2Score.value ? this.state.selectedPlayer1.value : this.state.selectedPlayer2.value,
      LoserId: this.player1Score.value > this.player2Score.value ? this.state.selectedPlayer2.value : this.state.selectedPlayer1.value,
      WinnerScore: this.player1Score.value > this.player2Score.value ? this.player1Score.value : this.player2Score.value,
      LoserScore: this.player1Score.value > this.player2Score.value ? this.player2Score.value : this.player1Score.value,
      IsTournamentGame: false,
    };
    console.log(game);
    axios.post('http://localhost:8081/api/games', game);
  }
  
  componentDidMount() {  
    axios.get(`http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/players`)
      .then(res => {
        let players = res.data;
        this.setState({
          ...this.state,
          players: [...players]
        });  
      })
  }

  render() {
    return (
       <Row>
        <Col md={2}>
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
          <FormGroup>
            <FormControl placeholder="Score" type="number" inputRef={ref => { this.player1Score = ref; }} />
          </FormGroup>
        </Col>
        <Col md={2}>    
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
          <FormGroup>
            <FormControl placeholder="Score" type="number" inputRef={ref => { this.player2Score = ref; }} />
          </FormGroup>
        </Col>
        <Col md={8}>
          <Button onClick={this.submitGame}>Submit Game</Button>
        </Col>
      </Row>
    );
  }
}

export default GameTab;
