import storage from './storage';

// TODO: calling REST instead of using localStorage

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (typeof cb === 'function') cb(true)
      return
    }
    sendLoginRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.loggedEmail = email
        if (typeof cb === 'function') cb(true)
      } else {
        if (typeof cb === 'function') cb(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  getLoggedEmail() {
    return localStorage.loggedEmail
  },

  logout(cb) {
    delete localStorage.token
    delete localStorage.loggedEmail
    if (typeof cb === 'function') {
      cb();
    } 
  },

  isLoggedIn() {
    return !!localStorage.token
  }
}

function sendLoginRequest(email, pass, cb) {
    if (storage.authentication(email, pass)) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
}
