import React, { Component } from 'react';
import axios from 'axios';
import { Button, 
  FormControl, 
  FormGroup,
  Row,
  Col,
  Tab
} from 'react-bootstrap';

class StatisticsTab extends Component {
  constructor() {
     super();
     this.state={
        games:[], 
    };  
  }

  componentDidMount() {  
    axios.get(`http://ping-pong-env.qtiruet3fh.us-east-2.elasticbeanstalk.com/api/games`)
      .then(res => {
        let games = res.data;
        this.setState({
          ...this.state,
          games: [...games]
        });  
      })
  }

  render() {
    return (
      <form onSubmit={this.createPlayer}>
        <Row>
            {this.state.games.map(game => 
              <div key={game.id}> {"Winner: " + game.WinnerId + " Loser: " + game.LoserId} </div>
            )}
        </Row>
      </form>
    );
  }
}

export default StatisticsTab;
