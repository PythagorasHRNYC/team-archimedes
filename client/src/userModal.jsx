import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from 'react-modal';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class UserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        email: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/login', this.state.user)
    .then(response => {
      const { id } = response.data;
      this.props.storeUser(id);
    })
    .catch(error => {
      console.error('There was an error:', error)
    })
  }

  render() {
    const { username, email } = this.state.user
    return (
      <Card>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <TextValidator
            floatingLabelText="Username"
            onChange={this.handleChange}
            name="username"
            value={username}
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <TextValidator
            floatingLabelText="Email"
            onChange={this.handleChange}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />
          <RaisedButton type="submit" label="Submit" primary />
        </ValidatorForm>
      </Card>
    );
  }
}