import React, { Component } from 'react';
import { Link } from 'react-router'
import timeago from 'timeago.js';
import auth from '../modules/auth';

export default class UserTable extends Component {
  constructor() {
    super();
    this.state = { selectedUsersId: []}
  }
  handleSelect(index) {
      let arr = this.state.selectedUsersId;
      if (arr.indexOf(index) > -1) {
        arr.splice(arr.indexOf(index), 1);
      } else {
        arr.push(index);
      }
      this.setState({selectedUsersId: arr})
      this.props.onSelectRow(arr);
  }
  render() {
    let rows = [];
    this.props.users.forEach(function(user, index) {
      if (user.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<UserRow user={user} key={user.id} onSelectUserRow={this.handleSelect.bind(this, user.id)} />);
    }.bind(this));

    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Group</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
};

class UserRow extends Component {
  constructor() {
    super();
  }
  render() {
    let timeFormat = timeago();
    let disabled = (this.props.user.email === auth.getLoggedEmail());
    return (
        <tr>
          <td><input type="checkbox" onChange={this.props.onSelectUserRow} disabled={disabled}/></td>
          <td><Link to={'/userDetail?id='+this.props.user.id}>{this.props.user.name}</Link></td>
          <td>{this.props.user.username}</td>
          <td>{this.props.user.email}</td>
          <td>{this.props.user.role}</td>
          <td>{this.props.user.group}</td>
          <td>{timeFormat.format(this.props.user.created)}</td>
        </tr>
      );
  }
};
