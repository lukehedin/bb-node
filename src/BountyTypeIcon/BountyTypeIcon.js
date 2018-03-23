import React, { Component } from 'react';

import iconActivity from './iconActivity.svg';
import iconAlcohol from './iconAlcohol.svg';
import iconDrink from './iconDrink.svg';
import iconFood from './iconFood.svg';
import iconSweets from './iconSweets.svg';
import iconVoucher from './iconVoucher.svg';

export default class BountyTypeIcon extends Component {
    getIconSrc(){
        switch(this.props.type){
            case 1:
                return iconSweets;
            case 2:
                return iconFood;
            case 3:
                return iconActivity;
            case 4:
                return iconAlcohol;
            case 5:
                return iconVoucher; 
            case 6:
                return iconDrink; 
            default:
                return '';
        }
    }
    render() {
        return (
          <img className="bounty-type-icon" src={this.getIconSrc()} />
        );
    }
}