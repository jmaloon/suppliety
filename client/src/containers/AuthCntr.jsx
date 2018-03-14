import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthForm from 'components/forms/AuthForm';

import * as authActions from 'actions/AuthActions';

class AuthCntr extends Component {
  onLogin = data => {
    // this.
    console.log(data);
    this.props.authActions.loginUser(data);
  };
  //
  // onSignup = data => {
  //   // console.log(data);
  //   this.props.authActions.signupUser(data);
  // };

  render() {
    const { currentUser } = this.props;
    return currentUser ? null : <AuthForm onLogin={this.onLogin} />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(AuthCntr);
