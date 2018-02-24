import Util from '../util';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

class LoginForm extends Component {
  constructor(props) {
    super(props);

		this.handleLoginClick = this.handleLoginClick.bind(this);
    
    this.state = {
      bountyResultItems: []
    };
	}
	handleLoginClick() {
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    console.log('username');
    console.log('password');

    Util.post("/api/login", { 
      username: username,
      password: password
    }, function(result) {
      console.log(result);
    });
	}
  render() {
    return (
      <div className="login-form">
        TODO: Facebook here
        <br/>
        ---
        <br />
        <input ref="username" type="text" placeholder="Enter username" />
        <input ref="password" type="password" placeholder="Enter password" />
        <Button text="Log In" onClick={this.handleLoginClick}/>
        <Link to="/forgotten">I forgot my password</Link>
      </div>
    );
  }
}

export default LoginForm;
