import Util from '../util';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

class LoginForm extends Component {
  constructor(props) {
    super(props);

		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.inputkeyDown = this.inputkeyDown.bind(this);
    
    this.state = {
      bountyResultItems: []
    };
  }
  inputkeyDown(e){
    debugger;
    if(e.keyCode === 13) this.handleLoginClick();
  }
	handleLoginClick() {
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    Util.post("/api/login", { 
      username: username,
      password: password
    }, {
      success: function(result) {
        //If successful, store JWT in localStorage
        localStorage.setItem('bb-jwt', result.token);
  
        console.log(result);
      }
    });
	}
  render() {
    return (
      <div className="login-form">
        TODO: Facebook here
        <br/>
        ---
        <br />
        <input ref="username" onKeyDown={this.inputkeyDown} type="text" placeholder="Enter username" />
        <input ref="password" onKeyDown={this.inputkeyDown} type="password" placeholder="Enter password" />
        <Button text="Log In" onClick={this.handleLoginClick}/>
        <Link to="/forgotten">I forgot my password</Link>
      </div>
    );
  }
}

export default LoginForm;
