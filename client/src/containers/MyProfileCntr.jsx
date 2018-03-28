import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import MyProfile from 'components/MyProfile';
import Loader from 'components/my-elements/Loader';

import * as userActions from 'actions/UserActions';

class MyProfileCntr extends Component {
  updateUser = userData => {
    this.props.userActions.updateUser(userData);
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser === false) return <Redirect to='/' />
    if (currentUser === null) return <Loader />;
    return <MyProfile currentUser={currentUser} onSubmit={this.updateUser} />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(MyProfileCntr);
