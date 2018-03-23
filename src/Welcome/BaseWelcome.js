import React, { Component } from 'react';
import LocationSearch from "../LocationSearch/LocationSearch";

export default class BaseWelcome extends Component {
	render() {
		return (
			<div className="welcome-panel moving-background">
				<div className="location-info content">
					<LocationSearch onPlaceChange={this.props.onPlaceChange} showSearchButton={true} />
				</div>
			</div>
		);
	}
}