import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    // delegate events to component
    this.props.onUserInput(
      e.target.value
    );
  }
  render() {
    return (
      <div className="search-bar">
        <form>
          <input type="text" placeholder="Search..." value={this.props.filterText} 
                  onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
};