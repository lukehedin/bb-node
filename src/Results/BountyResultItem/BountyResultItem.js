import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BountyTypeIcon from '../../BountyTypeIcon/BountyTypeIcon';

export default class BountyResultItem extends Component {
    renderTypes(){
        return this.props.bounty.types.map((typeId) => {
            return (<BountyTypeIcon key={typeId} type={typeId} />);
        });
    }
    getNewLabel(){
        return (<div key="0" className="bounty-mini-label">
            new
        </div>);
    }
    getRatingLabel(){
        return (<div key="1" className="bounty-mini-label rating">
            4.3★
        </div>);
    }
	render() {
        const photoStyle = { 
            backgroundImage: 'url(/img/bounty/' + this.props.bounty.thumbnail + ')'
        };

        return(
            <div className="bounty-item">
                <div className="bounty-item-inner">
                    <Link to={{ pathname: '/bounty', search: '?bountyId=' + this.props.bounty._id }}>
                        <div className="bounty-item-photo" style={photoStyle}>
                            <div className="bounty-org-name bounty-photo-label">
                                <b>{this.props.bounty.organisation.name}</b>
                                <div className="bounty-km">&lt;1km</div>
                            </div>
                            <div className="bounty-type-icon-container">
                                {this.renderTypes()}
                            </div>
                        </div>
                        <div className="bounty-item-label">
                            <h1>
                                {this.props.bounty.title}
                            </h1>
                            <div className="mini-labels-area">
                                {this.getNewLabel()} 
                                {this.getRatingLabel()} 
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
		);
	}
}