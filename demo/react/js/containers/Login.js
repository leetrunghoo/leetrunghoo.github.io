import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import auth from '../modules/auth';

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();

      const email = this.refs.email.value;
      const pass = this.refs.password.value;

      auth.login(email, pass, (isLoggedIn) => {
        if (!isLoggedIn) {
          return this.setState({ error: true });
        }
        const { location } = this.props;
        if (location.state && location.state.nextLocation) {
          browserHistory.push(location.state.nextLocation.pathname + location.state.nextLocation.search);
        } else {
          browserHistory.push('/home');
        }
      });
  }

  render() {
    return (
      <div className="page">
        <div className="page-container">
          <div className="page-title">Login</div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div >Email</div>
              <input type="text" ref="email" placeholder="email" className="form-control" defaultValue="test@gmail.com"/>
            </div>
            <div className="form-group">
              <div >Password</div>
              <input type="password" ref="password" placeholder="password" className="form-control"/>
            </div>
            <div className="form-group">
              <div ></div>
              <input type="checkbox" ref="IsRemember" id="isRemember" className="form-control"/>
              <label htmlFor="isRemember">Remember me</label>
            </div>
            <div className="form-group">
              <div ></div>
              <button className="button button--primary" onClick={this.handleSubmit} >Sign In</button>
            </div>
            {this.state.error && (
              <p className="error">Wrong email or password</p>
            )}
          </form>
        </div>
      </div>  
    );
  }
}

// Login.propTypes = {
//   user: React.PropTypes.object,
//   login: React.PropTypes.func,
//   logout: React.PropTypes.func
// }
// Login.defaultProps = {
//   user: ''
// };

