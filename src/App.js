import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import Util from './Util';

import LoadMask from './LoadMask/LoadMask';
import AppHeader from './AppHeader/AppHeader';
import AppFooter from './AppFooter/AppFooter';
import BaseWelcome from './Welcome/BaseWelcome';
import BaseResults from './Results/BaseResults';
import BaseBounty from './Bounty/BaseBounty';
import BaseAuthentication from './Authentication/BaseAuthentication';
 
 // App component - base of the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    //Use meteor to get user
    //LH unsure if this is safe
    let user = null; //Meteor.user();

    this.state = {
      bountyLoaded: false,
      bounty: [],
      hideCompleted: false,
      user: user || null,
      userLocation: this.getUserLocation(),
      errorMsg: null
    };
  }
  componentDidMount(){
    this.loadBounty();
  }
  getUserLocation(){
    let userLocation = localStorage.getItem('userLocation');
    return userLocation 
      ? JSON.parse(userLocation) 
      : null; 
  }
  setUserLocation(place){
    if(place){
      let userLocation = {
        placeId: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      };
  
      localStorage.setItem('userLocation', JSON.stringify(userLocation));

      this.setState({
        userLocation: userLocation
      });
    } else{
      localStorage.removeItem('userLocation');

      this.setState({
        userLocation: null
      });
    }
  }
  loadBounty(){
    Util.post('/api/getallbounty', {}, {
      success: result => {
        this.setState({
          bounty: result,
          bountyLoaded: true
        });
      },
      failure: err => {
          this.setState({
              formError: err
          });
      }
    });
  }
  applyBountyTimeData(){
    let now = new Date();
    let dateCreated = new Date(this.props.bounty.created);
    //TODO on bounty load 
  }
  applyBountyDistances(){
    //TODO on location change 
  }
  applyBountyAvailibilities(){
    //TODO on user change
  }
  render() {
    if(this.state.errorMsg) {
      return(<div> Birthday Bounty is unavailable at the moment. Please check back later. <br/> ERR: {this.state.errorMsg} </div>);
    } else if(!this.state.bountyLoaded) {
      //The app has a loadmask until bounty has loaded from the server
      return(<LoadMask message="Loading..." />);
    }
    //Required in order to pass onPlaceChange props
    const BaseWelcomeFn = (props) => {
      return this.getUserLocation()
        ? (<Redirect to="/results"/>)
        : (<BaseWelcome onPlaceChange={this.setUserLocation.bind(this)} {...props}/>)
    };

    const BaseResultsFn = (props) => {
      return this.getUserLocation()
        ? (<BaseResults bounty={this.state.bounty} {...props}/>)
        : (<Redirect to="/"/>)
    }

    const BaseBountyFn = (props) => {
      let bountyId = new URLSearchParams(props.location.search).get('bountyId');

      if(!bountyId) return (<Redirect to="/"/>);

      let bounty = this.state.bounty.find(b => {
        return b._id === bountyId;
      });

      return bounty
        ? (<BaseBounty bounty={bounty} currentUser={this.state.user} {...props}/>)
        : (<Redirect to="/"/>)
    }

    return (
      <div className="container">
        <Router>
          <div className="container-content">
            <AppHeader onPlaceChange={this.setUserLocation.bind(this)} currentLocation={this.getUserLocation()} currentUser={this.state.user}/>
            <div className="scroll-content">
              <Route exact path="/" render={BaseWelcomeFn} />
              <Route path="/welcome" component={BaseWelcomeFn} />
              <Route path="/results" component={BaseResultsFn} />
              <Route path="/bounty" component={BaseBountyFn} />
              <Route path="/authentication" component={BaseAuthentication} />
              <AppFooter />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}