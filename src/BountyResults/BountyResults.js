import Util from '../util';
import React, { Component } from 'react';
import BountyResultItem from './BountyResultItem/BountyResultItem'

class BountyResults extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bountyResultItems: []
    };
	}
  componentDidMount() {
    var cmp = this;
    
    Util.post("/api/getallbounty", {}, function(result) {
      cmp.setState({
        bountyResultItems: result
      });
    });
	}
  render() {
    return (
      <div className="bounty-results">
        {this.state.bountyResultItems.map((item, i) => <BountyResultItem key={item.BountyId} item={item} />)}
      </div>
    );
  }
}

export default BountyResults;
