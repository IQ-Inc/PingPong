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
     this.state={}
  } 

  render() {
    return (
        <Row>
            {this.props.games.map(game => 
                <div key={game.id}> {"Winner: " + game.WinnerId + " Loser: " + game.LoserId} </div>
            )}
        </Row>
    );
  }
}

export default StatisticsTab;
