import React, { Component } from 'react';
import logo from './images/kostium.jpg';

export default class Filters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div className="container-fluid">
  			<img src={logo}
  				className="card-img-bottom border"
  				alt="..." />
      </div>
  	);
  }
}