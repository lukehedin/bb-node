import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../Util';

import Button from '../../Button/Button';
import FormInput from '../../FormInput/FormInput';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        formError: null
    };
  }
  validateForm(formData){
    let errorMsg = null;

    switch(true){
        case (!formData.username):
            errorMsg = "Please provide a username.";
            break;
        case (!formData.password):
            errorMsg = "Please provide a password.";
            break;
        default:
            break;
    }

    if(errorMsg){
        this.setState({
            formError: errorMsg
        });
    }

    return !errorMsg;
  }
  onSubmitForm(e){
    e.preventDefault();

    let formData = {
      username: this.refs.username.getValue(),
      password : this.refs.password.getValue()
    };

    let isValid = this.validateForm(formData);
    if(!isValid) return;

    Util.post('/api/login', { 
      username: formData.username,
      password: formData.password
    }, {
      success: result => {
        //If successful, store JWT in localStorage
        localStorage.setItem('bb-jwt', result.token);

        this.props.onAuthenticated();
      },
      failure: err => {
          this.setState({
              formError: err.message
          });
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmitForm.bind(this)} className="login-form">
        <FormInput ref="username" type="text" label="Username" />
        <FormInput ref="password" type="password" label="Password" />
        <div className="form-error">{this.state.formError}</div>
        <Button text="Log In" type="submit" />
        <div className="auth-switch-msg">
          <div>
            Don't have an account?
          </div>
          <Link to="/authentication?type=register">
            Register here
          </Link>
        </div>
      </form>
    );
  }
}