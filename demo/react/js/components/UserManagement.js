import React, { Component } from 'react';
import UserBar from './UserBar';
import SearchBar from './SearchBar';
import UserTable from './UserTable';
import storage from '../modules/storage';


export default class UserManagement extends Component {
  constructor() {
    super();
    this.state = {
      users: storage.getListUsers(),
      filterText: '',
      selectedUsersId: ''
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSelectRow = this.handleSelectRow.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }
  handleUserInput(filterText) {
    this.setState({filterText});
  }
  handleSelectRow(selectedUsersId) {
    this.setState({selectedUsersId});
  }
  handleDeleteUser(users) {
    this.setState({users});
  }
  render() {
    return (
      <div className='user-management'>
        <div className='tool-bar'>
          <UserBar selectedUsersId={this.state.selectedUsersId} users={this.state.users} onDeleteUsers={this.handleDeleteUser}/>
          <SearchBar
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput}
          />
        </div>
        <UserTable
          users={this.state.users}
          filterText={this.state.filterText}
          selectedUsersId={this.state.selectedUsersId}
          onSelectRow={this.handleSelectRow}
        />
      </div>
    );
  }
};
