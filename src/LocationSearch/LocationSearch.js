import React, { Component } from 'react';
import Google from '../Google';

import imgPlaceMarker from './placeMarker.svg';
import Button from '../Button/Button';

export default  class LocationSearch extends Component {
	constructor(props) {
		super(props);
		
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);

		this.state = { dobDay: '', dobMonth: 0, dobYear: '', location: null };
	}
	componentDidMount(e) {
        var input = this.refs.search;
        Google.autocomplete(input, (place) => {
            this.props.onPlaceChange(place);
        });

        if(!this.props.currentLocation) input.focus();
	}
	handleLocationFocus(e) {
		//Only here to erase placeID on click
		e.target.value = null;
		this.setState({
			location: null
		});
	}
	handleLocationBlur(e){
		if(this.props.currentLocation) e.target.value = this.props.currentLocation.name;
	}
	render() {
        let value = this.props.currentLocation
            ? this.props.currentLocation.name
            : '';
        
		return (
			<div className="location-search">
				<img className="location-icon" src={imgPlaceMarker} alt="" />
				<input ref="search" 
				onFocus={this.handleLocationFocus} 
				onBlur={this.handleLocationBlur}
				placeholder="Enter city/suburb" 
				defaultValue={value} />
				{!this.props.showSearchButton 
					? '' 
					: <Button text="Search" />}
			</div>
		);
	}
}