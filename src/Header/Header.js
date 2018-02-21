import React, { Component } from 'react';
import bb_flag from '../_img/bb_flag.svg';

class Header extends Component {
	constructor(props) {
		super(props);

		this.handleLogInClick = this.handleLogInClick.bind(this);
		this.handleSignUpClick = this.handleSignUpClick.bind(this);
	}
	handleLogInClick() {

	}
	handleSignUpClick() {

	}
	render() {
		return (
			<header className="site-header content">
				<div className="header-logo">
					<img src={bb_flag} className="App-logo" alt="logo" />
					<img src="/Assets/img/bb_flag.svg" alt="" />
					<h1>Birthday Bounty</h1>
				</div>
				<div className="header-user">
					{true ?
						<div className="user-details">

						</div> :
						<div className="user-buttons">
							<button className="button-login light-button" onClick={this.handleLogInClick}>
								Log In
							</button>
							<button className="button-signup dark-button" onClick={this.handleSignUpClick}>
								Sign Up
							</button>
						</div>
					}
				</div>
			</header>
		);
	}
}

export default Header;