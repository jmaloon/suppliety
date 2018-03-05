import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeLayout from 'components/layouts/HomeLayout';

import * as userActions from 'actions/UserActions';
import * as companyActions from 'actions/CompanyActions';
import * as connectionActions from 'actions/ConnectionActions';

class HomeCntr extends Component {
  onUserSubmit = userData => {
    console.log(userData);
    this.props.userActions.updateUser(userData);
  };

  onUserCompanyCreate = companyData => {
    this.props.companyActions.createCompany(companyData);
  };

  onUserCompanySelect = companyId => {
    this.props.connectionActions.accountRequest(companyId);
  };

  render() {
    const { currentUser } = this.props;

    return (
      <HomeLayout
        currentUser={currentUser}
        onUserSubmit={this.onUserSubmit}
        onUserCompanyCreate={this.onUserCompanyCreate}
        onUserCompanySelect={this.onUserCompanySelect}
      />
    );
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    companyActions: bindActionCreators(companyActions, dispatch),
    connectionActions: bindActionCreators(connectionActions, dispatch)
  })
)(HomeCntr);
