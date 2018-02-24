import React, { Component } from 'react';
import Button from '../Button/Button';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.handleClearDetailsClick = this.handleClearDetailsClick.bind(this);
	}
	handleClearDetailsClick() {
		// BB.post('Session/ClearLocation');
		// BB.location = null;
		console.log('bam');
	}
	render() {
		return (
			<footer className="site-footer">
				<div className="content">
                <Button text="Clear Saved Details" onClick={this.handleClearDetailsClick}/>
				</div>
			</footer>
		);
	}
}

export default Footer;