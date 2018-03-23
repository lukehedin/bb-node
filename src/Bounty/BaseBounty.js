import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BountyTypeIcon from '../BountyTypeIcon/BountyTypeIcon';

export default class BaseBounty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }
    renderTypes(){
        return this.props.bounty.types.map((typeId) => {
            return (<BountyTypeIcon key={typeId} type={typeId} />);
        });
    }
    getSocialIcon(socStr){
        let soc = this.props.bounty.organisation.social[socStr];

        return soc
            ? (<a target="_blank" href={soc}>
                    <img className="social-button" src={"img/soc_" + socStr + ".svg"} />
                </a>)
            : null;
    }
    render() {
        const photoStyle = { 
            backgroundImage: 'url(/img/bounty/' + this.props.bounty.thumbnail + ')'
        };

        return (<div className="bounty-detail-container">
            <div className="bounty-cover-image" style={photoStyle}>
            </div>
            <div className="content">
                <div className="bounty-item-header">
                    <h1 className="bounty-viewing-item-title">
                         this.props.bounty.title }
                    </h1>
                    <div className="bounty-item-org-social">
                        {this.getSocialIcon("facebook")}
                        {this.getSocialIcon("instagram")}
                        {this.getSocialIcon("twitter")}
                    </div>
                </div>
                <h3 className="bounty-viewing-item-org">
                    { this.props.bounty.organisation.name }
                </h3>
                <div className="bounty-item-details">
                    <div className="col-xs-12">
                        <b>Bounty Types:</b>
                        {this.renderTypes()}
                    </div>
                    <div className="col-xs-12">
                        <b>Approximate Value:</b>
                        <span>{this.props.bounty.maxValue}</span>
                    </div>
                    <div className="col-xs-12">
                        <b>Available to You:</b>
                        {this.props.currentUser 
                            ? (<div/>) //todo: use avail period
                            : (<div>
                                    <Link to="/authentication">
                                        Login
                                    </Link>
                                    <span> to find out when you can claim this bounty</span>
                                </div>)}
                    </div>
                    <div className="col-xs-12">
                        <b>Additional Details:</b>
                        <span>{this.props.bounty.additionalDetails}</span>
                    </div>
                    {/* <div className="col-xs-12">
                        <b>{ getBountyAvailabilityMessage(this.props.bounty) }</b>
                    </div> */}
                </div>
                <hr/>
                {/* <div className="condition-list">
                    <h3>Conditions <div className="bounty-mini-label" ng-mouseenter="root.getTip($event, 0, 'Conditions','The conditions section explains exactly what you need to do to claim this bounty.<br/>Read them carefully!')">?</div></h3>
                    <b>To claim this Birthday Bounty:</b>
                    <div className="condition-item registration-url-bullet" ng-if="viewingBountyItem.conditions.registrationRequiredUrl">
                        <a target="_blank" ng-href={this.props.bounty.conditions.registrationRequiredUrl}>Sign up here</a><span ng-if="viewingBountyItem.conditions.minimumRegistrationDays"> at least <span style="font-weight: bold;">{ viewingBountyItem.conditions.minimumRegistrationDays } days</span> before your birthday</span>
                    </div>
                    <div className="condition-item store-card-bullet" ng-if="viewingBountyItem.conditions.cardActivationUrl">
                        Go in-store to get a { this.props.bounty.conditions.cardClubName } card, then <a target="_blank" ng-href={viewingBountyItem.conditions.cardActivationUrl}>activate it here</a><span ng-if="viewingBountyItem.conditions.minimumRegistrationDays"> at least <b>{ this.props.bounty.conditions.minimumRegistrationDays } days</b> before your birthday</span>
                    </div>
                    <div className="condition-item id-bullet" ng-if="viewingBountyItem.conditions.identificationRequired">
                        Provide ID to verify your date of birth
                    </div>
                    <div className="condition-item digital-voucher-bullet" ng-if="viewingBountyItem.conditions.digitalVoucherRequired">
                        Present a digital voucher on a phone or tablet
                    </div>
                    <div className="condition-item paper-voucher-bullet" ng-if="viewingBountyItem.conditions.paperVoucherRequired">
                        Print off and present a paper voucher
                    </div>
                    <div className="catch-condition" ng-if="viewingBountyItem.conditions.catch">
                        <span style="font-weight: bold;" className="hidden-xs">There's a catch:</span>
                        <div>
                            <span style="font-weight: bold;" className="hidden-lg hidden-md hidden-sm">Catch:</span>
                            { this.props.bounty.conditions.catch }
                        </div>
                    </div>
                    <div ng-if="viewingBountyItem.conditions.notes && viewingBountyItem.conditions.notes.length > 0">
                        <div ng-if="viewingBountyItem.conditions.notes && viewingBountyItem.conditions.notes.length > 0">
                            <div className="additional-claim-note" ng-repeat="note in viewingBountyItem.conditions.notes track by $index">
                                { note }
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <h3>Location</h3>
                <div ng-if="nearestBountyPlace" className="nearest-organisation-info">
                    <div>
                        <b>Address:</b>
                        { nearestBountyPlace.formatted_address }
                    </div>
                    <div>
                        <a className="standard-button" ng-href={ '#/map?lat=' + nearestBountyPlace.geometry.location.lat() + '&lng=' + nearestBountyPlace.geometry.location.lng() }> 
                            View on Map 
                        </a>
                    </div>
                    <div>
                        <b>Phone:</b>
                        { nearestBountyPlace.formatted_phone_number ? nearestBountyPlace.formatted_phone_number : '-'}
                    </div>
                    <div>
                        <b>Opening Hours:</b>
                        <span ng-repeat="weekdayText in nearestBountyPlace.opening_hours.weekday_text track by $index">
                            { weekdayText }
                            <br/>
                        </span>
                    </div>
                </div>
                <div ng-if="!nearestBountyPlace" className="nearest-organisation-info">
                    <span ng-if="root.savedUserDetails">Loading { this.props.bounty.organisation.name } location... </span>
                    <a ng-click="root.clearBirthday()" href="" ng-if="!root.savedUserDetails">Enter your address to find the closest location!</a>
                </div>
                <div className="bounty-image-container">
                    <span className="bounty-feature-image" ng-style={ 'background-image': !!viewingBountyItem.thumbnail ? 'url(images/bountypix/' + viewingBountyItem.thumbnail + ')' : ''}/>
                    <bountymap className="bounty-map-container bounty-map-for-item hidden-sm hidden-xs"></bountymap>
                </div> */}
            </div>
        </div>
        );
    }
}