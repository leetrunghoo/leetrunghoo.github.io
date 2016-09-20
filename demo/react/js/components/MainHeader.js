import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import auth from '../modules/auth';
import storage from '../modules/storage';

export default class MainHeader extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    auth.logout();
    browserHistory.push('/login');
  }
  render() {
    let user = storage.getUserByEmail(auth.getLoggedEmail());
    return (
      <header className="header">
        <div className="header-logo"></div>
        <div className="header-title">User Management System</div>
        <div className="header-user">{user.name} <a onClick={this.handleLogout}>Log out</a></div>
      </header>
    );
  }
};
