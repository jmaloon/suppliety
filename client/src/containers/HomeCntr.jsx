import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeLayout from 'components/layouts/HomeLayout';

import * as userActions from 'actions/UserActions';
import * as companyActions from 'actions/CompanyActions';

class HomeCntr extends Component {
  onUserSubmit = userData => {
    console.log(userData);
    this.props.userActions.updateUser(userData);
  };

  onUserCompanyCreate = companyData => {
    this.props.companyActions.createCompany(companyData);
  };

  onUserCompanySelect = companyId => {
    this.props.companyActions.joinCompanyRequest(companyId);
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
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(HomeCntr);
