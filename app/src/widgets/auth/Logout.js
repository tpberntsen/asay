import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <a onClick={this.logout} className="link pointer dark-blue hover-blue">Log ud</a>
    );
  }
  logout = async() => {
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('user');
    window.location.reload();
  }
}

export default Logout;