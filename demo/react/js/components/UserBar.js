import React, { Component } from 'react';
import { Link } from 'react-router'
import storage from '../modules/storage';

export default class UserBar extends Component {
  constructor() {
    super();
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }
  handleDeleteUser() {
    if (!this.props.selectedUsersId && this.props.selectedUsersId.length === 0) {
      return;
    }
    let usersAfter = this.props.users;
    this.props.selectedUsersId.forEach(userId => {
    	storage.deleteUserById(userId);
    	usersAfter = usersAfter.filter(user => user.id != userId);
    });
    this.props.onDeleteUsers(usersAfter);
  }
  render() {
    return (
      <div className="user-bar">
        <Link className="button" to="/add-user">Add New User</Link>
        <button className="button" onClick={this.handleDeleteUser} >Remove User</button>
      </div>
    );
  }
};