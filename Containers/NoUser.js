import React, { Component } from 'react'
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';

export default class NoUser extends Component {
  state = {
    showLogin: false,
  }

  toggleScreen = _ => {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  }
    
  render() {
    const { showLogin } = this.state;

    if(showLogin)
      return <Login toggle={this.toggleScreen} />;

    return <SignUp toggle={this.toggleScreen} />;
  }
}