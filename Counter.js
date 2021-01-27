"use strict";

import React, { Component } from "react";


export default class Counter extends Component {
	state = { count: 0 };

	incrementCount = () => this.setState({ count: this.state.count + 1 });

	render() {
	return (<h1 onClick={this.incrementCount}>YOLO : {this.state.count}</h1>)
	}
}
