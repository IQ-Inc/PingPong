import React, { Component } from 'react';
import axios from 'axios';
import { Button, 
  FormControl, 
  FormGroup,
  Col
} from 'react-bootstrap';
import {
  server_url
} from '../static/constants';

class CreatePlayerTab extends Component {
  constructor() {
      super();
      this.state={}
  }

  createPlayer = () => {
    let player = {
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
    };
    axios.post(server_url + "api/players", player)
    .then(res => {
      this.props.loadPlayers();
    });
  }

  render() {
    return (
      <form onSubmit={this.createPlayer}>
        <Col md={2}>
          <FormGroup>
            <FormControl placeholder="First Name" inputRef={ref => { this.FirstName = ref; }} />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <FormControl placeholder="Last Name" inputRef={ref => { this.LastName = ref; }} />
          </FormGroup>
        </Col>
        <Col md={8}><Button type="submit">Create Player</Button></Col>
      </form>
    );
  }
}

export default CreatePlayerTab;
