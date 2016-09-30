import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
    	<div className="popup-page">
	        <div className="popup-page-content">
		      <h1>404 Page Not Found</h1>
		      <Link to="/">go to home page</Link>
	        </div>
        </div>
    );
  }
}
