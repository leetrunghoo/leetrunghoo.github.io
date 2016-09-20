import React, { Component } from 'react';
import { Router, Route, IndexRedirect, browserHistory, hashHistory } from 'react-router'
import Login from './containers/Login';
import Home from './containers/Home';
import UserView from './containers/UserView';
import UserCreate from './containers/UserCreate';
import NotFound from './containers/NotFound';
import auth from './modules/auth';

export default class App extends Component {
  constructor() {
      super();
      this.requireAuth = this.requireAuth.bind(this);

      // make fading animation after changing route
      browserHistory.listen(location =>  {
      let container = document.getElementById('container');
      container.className = 'opacity-0';
      setTimeout(function() {
        container.className += ' animate-opacity';
        setTimeout(function() {
          container.className = 'animate-opacity';
        }, 0);
      }, 0);
    });
    }
  requireAuth(nextState, replace) {
    if (!auth.isLoggedIn()) {
      replace({
        pathname: '/login',
        state: { nextLocation: nextState.location }
      })
    }
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRedirect to="/home" />
          <Route path="login" component={Login} />
          <Route path="home" component={Home} onEnter={this.requireAuth} />
          <Route path="userDetail" component={UserView} onEnter={this.requireAuth}/>
          <Route path="add-user" component={UserCreate} onEnter={this.requireAuth}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
}

