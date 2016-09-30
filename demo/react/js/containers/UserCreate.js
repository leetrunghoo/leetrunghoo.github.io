import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import storage from '../modules/storage';
import MainHeader from '../components/MainHeader'

export default class UserCreate extends Component {
    constructor() {
        super();
        this.state = {
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const user = {
        	email: this.refs.email.value,
        	name: this.refs.name.value,
        	username: this.refs.username.value,
        	pass: this.refs.password.value,
        	role: this.refs.role.value,
        	group: this.refs.group.value
        }
        for (var key in user) {
            if (user.hasOwnProperty(key)) {
                if (user[key].trim().length === 0) {
                    return this.setState({ error: true });
                }
            }
        } 
       
        storage.addNewUser(user, () => browserHistory.goBack());
    }
    render() {
        return (
	      	<div className="createUser-container container">
	      		<MainHeader/>
	       		<div className="popup-page">
                    <div className="popup-page-content has-border">
                        <div className="page-title">Add New User</div>
    	       		    <form className="form" onSubmit={this.handleSubmit}>
        		        	<div className="form-group"><div>Name:</div> <input type="text" ref="name"/></div>
        		        	<div className="form-group"><div>Username:</div> <input type="text" ref="username"/></div>
        		        	<div className="form-group"><div>Email:</div> <input type="text" ref="email"/></div>
        		        	<div className="form-group"><div>Password:</div> <input type="text" ref="password"/></div>
        		        	<div className="form-group"><div>User role:</div> <input type="text" ref="role"/></div>
        		        	<div className="form-group"><div>Group:</div> <input type="text" ref="group"/></div>
        		            <div className="form-group-action"><button className="button button--primary" type="submit">Submit</button><Link to="/home" className="button">Back to table</Link></div>

                            {this.state.error && (
                              <p className="error">Please fill in all the fields</p>
                            )}
        		        </form>
    	           </div>
               </div>
            </div>
	    )
    }
}
