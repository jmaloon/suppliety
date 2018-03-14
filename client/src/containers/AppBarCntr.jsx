import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'components/AppBar';

import * as authActions from 'actions/AuthActions';

class AppBarCntr extends Component {
  logout = () => this.props.authActions.logout();

  render() {
    const { currentUser } = this.props;
    return <AppBar currentUser={currentUser} logout={this.logout} />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(AppBarCntr);
