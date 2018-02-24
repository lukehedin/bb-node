import React, { Component } from 'react';

class BountyResultItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="bounty-item">
				<div className="bounty-item-inner">
					<img className="bounty-item-photo" src={"/public_img/" + this.props.item.imageId} />
					<div>
						{this.props.item.name}
					</div>
					<div>
						0km
					</div>
				</div>
			</div>
		);
	}
}

export default BountyResultItem;