import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profile from 'components/Profile';
import Loader from 'components/my-elements/Loader';

import * as userActions from 'actions/UserActions';

class ProfileCntr extends Component {
  updateUser = userData => {
    this.props.userActions.updateUser(userData);
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser) return <Loader />;
    return <Profile currentUser={currentUser} onSubmit={this.updateUser} />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(ProfileCntr);
