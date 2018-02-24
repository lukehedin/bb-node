import React, { Component } from 'react';
import LocationSearch from "../LocationSearch/LocationSearch";

class SubHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			birthdayFact: {
				title: 'Did you know?',
				details: 'On your birthday, 29 September, Alfred Hitchcock was born! Perhaps a film career is in store for you?'
			}
		};
	}
	render() {
		return (
			<nav className="site-subheader moving-background">
				<div className="location-info content">
					<LocationSearch showSearchButton={false} />
					<div className="spacer"></div>
					<div className="birthday-facts">
						<div className="title">
							{this.state.birthdayFact.title}
						</div>
						<div>
							{this.state.birthdayFact.details}
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default SubHeader;