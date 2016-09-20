import React, { Component } from 'react';
import { Link } from 'react-router'
import storage from '../modules/storage';
import timeago from 'timeago.js';
import MainHeader from '../components/MainHeader'

export default class UserView extends Component {
	render() {
		let timeFormat = timeago();
		let user = storage.getUserById(this.props.location.query.id);
	    return (
	      	<div className="viewUser-container">
	      		<MainHeader/>
	       		<div className="viewUser-wraper">
		       		<div className="viewUser-title">User Detail</div>
		       		<div className="viewUser-info">
			       		<div className="viewUser-info-avatar"></div>
			       		<div className="viewUser-info-text">
			       			<div className="viewUser-info-list-wraper">
						        <ul className="viewUser-info-list">
						        	<li>Name: {user.name}</li>
						        	<li>Username: {user.username}</li>
						        	<li>Email: {user.email}</li>
						        	<li>User role: {user.role}</li>
						        	<li>Group: {user.group}</li>
						        	<li>Created time: {timeFormat.format(user.created)}</li>
						        </ul>
					        </div>
				        	<div className="viewUser-info-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
			        	</div>
			        </div>
			        <Link to="/home" className="button">Back to table</Link>
		        </div>
	        </div>
	    );
    }
}

UserView.propTypes = {
	user: React.PropTypes.object
}
