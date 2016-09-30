import React, { Component } from 'react';
import MainHeader from '../components/MainHeader'
import UserManagement from '../components/UserManagement'
import storage from '../modules/storage';

export default class HomePage extends Component {
  render() {
    return (
        <div className="home-container container">
          <MainHeader/>
          <UserManagement />
        </div>
    );
  }
};
