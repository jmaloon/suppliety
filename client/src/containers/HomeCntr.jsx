import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeLayout from 'components/layouts/HomeLayout';

import * as userActions from 'actions/UserActions';

class HomeCntr extends Component {
  onUserSubmit = userData => {
    this.props.userActions.updateUser(userData);
  };

  onUserCompanySubmit = companyData => {
    // this.props.userActions.updateUser(companyData);
    console.log(companyData);
  };

  render() {
    const { auth } = this.props;

    return (
      <HomeLayout
        auth={auth}
        onUserSubmit={this.onUserSubmit}
        onUserCompanySubmit={this.onUserCompanySubmit}
      />
    );
  }
}

export default connect(
  ({ auth }) => ({
    auth: auth
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(HomeCntr);
