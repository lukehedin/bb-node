import React, { Component } from 'react';
import LocationSearch from "../LocationSearch/LocationSearch";

class WelcomePanel extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="welcome-panel moving-background">
				<div className="location-info content">
					<LocationSearch showSearchButton={true} />
				</div>
			</div>
		);
	}
}

export default WelcomePanel;