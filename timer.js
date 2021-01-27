"use strict";

import React, {Component} from "react";

export class Timer extends Component {
    state = {
        maxTime: 300,
        remainingTime: 300,
    };

    decrementTime() {
        this.setState({remainingTime: this.state.remainingTime + 1});
    }

    render() {
        return (
            <p>
                {this.state.remainingTime}
                {" : "}
                {this.state.remainingTime}
            </p>
        );
    }
}
