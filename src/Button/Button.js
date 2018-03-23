import React, { Component } from 'react';

export default class Button extends Component {
	render() {
        return (
            <button {...this.props} className={"button " + (this.props.className || "")}>
                {this.props.text}
            </button>
        );
	}
}