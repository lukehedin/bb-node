import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

class BaseAuthentication extends Component {
    constructor(props) {
        super(props);

        this.onAuthenticated = this.onAuthenticated.bind(this);

        this.state = {
            isRegister: this.getIsRegister(this.props)
        };
    }
    componentWillReceiveProps(newProps){
        this.setState({
            isRegister: this.getIsRegister(newProps)
        });
    }
    getIsRegister(props){
        let regParam = new URLSearchParams(props.location.search).get('type');
        return regParam === "register";
    }
    onAuthenticated(){
        this.props.history.push('/welcome');
    }
    render() {
        let form = this.state.isRegister
            ? <RegisterForm onAuthenticated={this.onAuthenticated} />
            : <LoginForm onAuthenticated={this.onAuthenticated} />

        return (
          <div className="authentication-container content">
              {form}
          </div>
        );
    }
}

//Used to allow history push
export default withRouter(BaseAuthentication);