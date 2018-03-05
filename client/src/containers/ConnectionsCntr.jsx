import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Connections from 'components/Connections';

import * as userActions from 'actions/UserActions';
import * as companyActions from 'actions/CompanyActions';

class ConnectionsCntr extends Component {
  // onUserSubmit = userData => {
  //   console.log(userData);
  //   this.props.userActions.updateUser(userData);
  // };
  //
  // onUserCompanyCreate = companyData => {
  //   this.props.companyActions.createCompany(companyData);
  // };
  //
  // onUserCompanySelect = companyId => {
  //   this.props.companyActions.joinCompanyRequest(companyId);
  // };

  acceptAccountRequest = joinerId => () => {
    this.props.companyActions.acceptAccountRequest(joinerId);
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Connections
        currentUser={currentUser}
        acceptAccountRequest={this.acceptAccountRequest}
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
)(ConnectionsCntr);
