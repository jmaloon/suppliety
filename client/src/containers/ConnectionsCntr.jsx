import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Connections from 'components/Connections';

import * as connectionActions from 'actions/ConnectionActions';

class ConnectionsCntr extends Component {
  acceptAccountRequest = joinerId => () => {
    this.props.connectionActions.acceptAccountRequest(joinerId);
  };

  acceptCompanyRequest = companyId => () => {
    this.props.connectionActions.acceptCompanyRequest(companyId);
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Connections
        currentUser={currentUser}
        acceptAccountRequest={this.acceptAccountRequest}
        acceptCompanyRequest={this.acceptCompanyRequest}
      />
    );
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  dispatch => ({
    connectionActions: bindActionCreators(connectionActions, dispatch)
  })
)(ConnectionsCntr);
