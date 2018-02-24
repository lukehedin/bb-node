import React, { Component } from 'react';
import Button from '../Button/Button';
import bb_flag from './bb_flag.svg';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<header className="site-header content">
				<Link className="header-logo" to='/welcome'>
					<img src={bb_flag} alt="" />
					<h1>Birthday Bounty</h1>
				</Link>
				<div className="header-user">
					{false ?
						<div className="user-details">

						</div> :
						<div className="user-buttons">
							<Button className="light-button" linkTo="/login" text="Log In"/>
							<Button className="dark-button" linkTo="/signup" text="Sign Up"/>
						</div>
					}
				</div>
			</header>
		);
	}
}

export default Header;