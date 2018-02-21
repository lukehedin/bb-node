import React, { Component } from 'react';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.handleClearDetailsClick = this.handleClearDetailsClick.bind(this);
	}
	handleClearDetailsClick() {
		// BB.post('Session/ClearLocation');
		// BB.location = null;
		window.location.href = '/Home';
	}
	render() {
		return (
			<footer class="site-footer">
				<div class="content">
					<div class="bottom-nav">
						<a href="#/">Home</a>
						| <a href="#/faq">Frequently Asked Questions</a>
						| <a href="#/privacy">Privacy Policy</a>
						| <button className="change-location light-button" onClick={this.handleClearDetailsClick}>
							Clear Saved Details
							</button>
						| <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeONtf0EBM-ECOxhHTm23njnGEifvnweCwn9dSzUBDsrLg-vw/viewform?usp=sf_link">Suggest an Offer</a>
					</div>
					<div class="bottom-nav">
						Created by <a target="_blank" href="http://www.lukehedin.com/">Luke Hedin</a>
						<br />
						Bounty data collected with <a target="_blank" href="https://www.linkedin.com/in/andrew-gierens-638b727b">Andrew Gierens</a> and <a target="_blank" href="https://www.instagram.com/malitoburito/">Mali Lewis</a>.
					</div>
					<div class="bottom-nav">
						Bounty-related icons designed by <a target="_blank" href="http://www.flaticon.com/authors/madebyoliver">Madebyoliver</a> of Flaticon.
						<br />
						Social icons designed by <a target="_blank" href="http://www.flaticon.com/authors/freepik">Freepik</a> of Flaticon.
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;