import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../Button/Button';
import FormInput from '../../FormInput/FormInput';

export default class LoginForm extends Component {
  constructor(props) {
        super(props);

        this.onFacebookClick = this.onFacebookClick.bind(this);

        this.state = {
            formError: null
        };
    }
    isEmail(emailString){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(emailString);
    }
    onFacebookClick(){
        // Meteor.loginWithFacebook({
        //     requestPermissions: ['public_profile', 'email', 'user_birthday']
        //   }, (err) => {
        //     if (err) {
        //       // handle error
        //       this.setState({
        //             formError: err.reason
        //         });
        //     } else {
        //       // successful login!
        //         this.props.onAuthenticated();
        //     }
        // });
    }
    onSubmitForm(e){
        e.preventDefault();

        let formData = {
            username: this.refs.username.getValue(),
            password : this.refs.password.getValue(),
            confpassword : this.refs.confpassword.getValue(),
            email : this.refs.email.getValue()
        };

        let isValid = this.validateForm(formData);
        if(!isValid) return;

        // Meteor.call('authentication.register', formData, (err, result) => {
        //     if(err) {
        //         let errorMsg = null;

        //         switch(err.error){
        //             case "email-in-use":
        //                 errorMsg = "Email is already in use. If you've forgotten your password, use the 'I forgot my password' link below.";
        //                 break;
        //             case "username-in-use":
        //                 errorMsg = "Username is already in use. Please choose a different username."
        //                 break;
        //             default:
        //                 errorMsg = "An error occurred (" + err.error + "). Please try again later."
        //                 break;
        //         }

        //         this.setState({
        //             formError: 'Incorrect username or password.'
        //         });
        //     } else {
        //         Meteor.loginWithPassword(formData.username, formData.password, (err) => {
        //             if(err){
        //                 this.setState({
        //                     formError: err.reason
        //                 });
        //             } else{
        //                 this.props.onAuthenticated();
        //             }
        //         });
        //     }
        // });
    }
    validateForm(formData){
        let errorMsg = null;

        switch(true){
            case (!formData.username):
                errorMsg = "Please provide a username.";
                break;
            case (!formData.email || !this.isEmail(formData.email)):
                errorMsg = "Please provide a valid email address.";
                break;
            case (!formData.password):
                errorMsg = "Please provide a password.";
                break;
            case (!formData.confpassword):
                errorMsg = "Please confirm your password.";
                break;
            case (formData.password !== formData.confpassword):
                errorMsg = "Passwords do not match.";
                break;
            case (formData.password.length < 6):
                errorMsg = "Password must be at least 6 characters";
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
    render() {
        return (
        <form className="login-form" onSubmit={this.onSubmitForm.bind(this)}>
            <Button text="Login with Facebook" onClick={this.onFacebookClick}/>
            <FormInput ref="username" type="text" label="Username" />
            <FormInput ref="email" type="email" label="Email" />
            <FormInput ref="password" type="password" label="Password" />
            <FormInput ref="confpassword" type="password" label="Confirm Password" />
            {/* <input required ref="dob" type="text" placeholder="Date of Birth" /> */}
            <div className="form-error">{this.state.formError}</div>
            <Button text="Log In" type="submit" />
            <div className="auth-switch-msg">
            <div>
                Already have an account?
            </div>
            <Link to="/authentication">
                Login here
            </Link>
            </div>
        </form>
        );
    }
}