import React, { Component } from 'react';
import place_icon from './place_icon.svg';
import Util from '../util';

class LocationSearch extends Component {
	constructor(props) {
		super(props);
		
		this.handleLocationFocus = this.handleLocationFocus.bind(this);

		this.state = { dobDay: '', dobMonth: 0, dobYear: '', location: null };
	}
	componentDidMount(e) {
		Util.loadGoogleMapsAndPlaces();

		// var options = { types: ['(cities)'], componentRestrictions: { country: 'au' } };

		// var input = this.refs.search;
		// BB.location
		// 	? input.value = BB.location.Name
		// 	: input.focus();

		// var autocomplete = new google.maps.places.Autocomplete(input, options);

		// google.maps.event.addListener(autocomplete, 'place_changed', function () {
		// 	var address = autocomplete.getPlace();

		// 	//BB.setLoading(e.target, true);

		// 	BB.post('Session/SetLocation', {
		// 		location: {
		// 			PlaceId: address.place_id,
		// 			Name: address.name,
		// 			Latitude: address.geometry.location.lat(),
		// 			Longitude: address.geometry.location.lng()
		// 		}
		// 	}, {
		// 		success: function (data) {
		// 			BB.setLocation(data);
		// 			window.location.href = '/Results';
		// 		},
		// 		complete: function (data) {
		// 			//BB.setLoading(e.target, false);
		// 		}
		// 	});
		// });
	}
	handleLocationFocus(e) {
		//Only here to erase placeID on click
		e.target.value = null;
		this.setState({
			location: null
		});
	}
	render() {
		return (
			<div className="location-search">
				<img className="location-icon" src={place_icon} alt="" />
				<input ref="search" onFocus={this.handleLocationFocus} placeholder="Enter city/suburb" />
				{!this.props.showSearchButton ? '' : <button>Search</button>}
			</div>
		);
	}
}

export default LocationSearch;