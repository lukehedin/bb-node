import React, { Component } from 'react';
import Button from '../Button/Button';
import LocationSearch from "../LocationSearch/LocationSearch";
import { Link, withRouter } from 'react-router-dom';

import imgLogo from '../logo.svg';

class AppHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			birthdayFact: {
				title: 'Birthday fact:',
				details: 'On your birthday, 29 September, Alfred Hitchcock was born! Perhaps a film career is in store for you?'
			}
		};
    }
    getUserSection(){
		return false //LH if user
			? (<div className="user-details">
					<div className="user-header-info">
						{/* {'Ahoy, ' + (Meteor.user().username || Meteor.user().profile.name) + '!'} */}
					</div>
					<Button className="light-button" text="Logout" onClick={this.logout.bind(this)} />
				</div>)
			: (<div className="user-buttons">
				<Link to="/authentication">
					<Button className="light-button" text="Login"/>
				</Link>
				<Link to={{ pathname: '/authentication', search: '?type=register' }}>
					<Button className="dark-button" text="Register"/>
				</Link>
			</div>);
    }
    logout() {
        // Meteor.logout((err) => {
        //     if(err){
        //         alert(err.reason);
        //     } else {
        //         this.props.onPlaceChange(null);
        //         this.props.history.push('/welcome');
        //     }
        // });
    }
	render() {
        let subHeader = this.props.currentLocation
            ? (<div className="app-subheader moving-background">
                    <div className="lower-header content">
                        <LocationSearch onPlaceChange={this.props.onPlaceChange} showSearchButton={false} currentLocation={this.props.currentLocation} />
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
                </div>)
            : null;

		return (
            <header className="app-header">
                <div className="upper-header content">
                    <Link className="header-logo" to='/'>
                        <img src={imgLogo} alt="" />
                        <h1>Birthday Bounty</h1>
                    </Link>
                    <div className="header-user">
                        {this.getUserSection()}
                    </div>
                </div>
                {subHeader}
            </header>
		);
	}
}

export default withRouter(AppHeader);