import React, { Component } from 'react';

export default class FormInput extends Component {
    getValue(){
        return this.refs.input.value;
    }
	render() {
        return (
            <div className={"form-input " + (this.props.className || "")}>
                <div className="form-input-label">
                    {this.props.label}
                </div>
                <input ref="input" {...this.props} />
            </div>
        );
	}
}