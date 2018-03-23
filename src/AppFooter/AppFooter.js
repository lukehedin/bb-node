import React, { Component } from 'react';
import Button from '../Button/Button';

export default class AppFooter extends Component {
	handleClearDetailsClick() {
        localStorage.removeItem('userLocation');
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