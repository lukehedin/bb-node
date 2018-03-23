import React, { Component } from 'react';
import BountyResultItem from './BountyResultItem/BountyResultItem'

export default class BountyResults extends Component {
  render() {
    return (
      <div className="bounty-results content">
        {this.props.bounty.map((item, i) => <BountyResultItem key={item._id} bounty={item} />)}
      </div>
    );
  }
}