import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {
	constructor(props) {
		super(props);
	}
	render() {
        var cls = "button " + (this.props.className || "");

        var buttonHtml = (
            <button className={cls} onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );

        if(this.props.linkTo){
            return (
                <Link to={this.props.linkTo}>
                    {buttonHtml}
                </Link>
            );
        } else{
            return buttonHtml;
        }
	}
}

export default Button;