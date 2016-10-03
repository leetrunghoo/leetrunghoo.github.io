import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <form>
          <input type="text" placeholder="Search..."
                  onChange={(e) => this.props.onUserInput(e.target.value)}/>
        </form>
      </div>
    );
  }
};