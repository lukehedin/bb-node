import React, { Component } from 'react';

export default class LoadMask extends Component {
	render() {
        return (
            <div {...this.props} className={"load-mask " + (this.props.className || "")}>
                <div className="load-mask-inner">
                    <div className="loader-circle"></div>
                    <div className="load-msg">
                        {this.props.message}
                    </div>
                </div>
            </div>
        );
	}
}