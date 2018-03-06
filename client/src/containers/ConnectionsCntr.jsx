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

  requestUserConnection = userId => () => {
    this.props.connectionActions.requestUserConnection(userId);
  };

  acceptUserConnection = userId => () => {
    this.props.connectionActions.acceptUserConnection(userId);
  };

  render() {
    const { currentUser } = this.props;

    return (
      <Connections
        currentUser={currentUser}
        acceptAccountRequest={this.acceptAccountRequest}
        acceptCompanyRequest={this.acceptCompanyRequest}
        requestUserConnection={this.requestUserConnection}
        acceptUserConnection={this.acceptUserConnection}
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
