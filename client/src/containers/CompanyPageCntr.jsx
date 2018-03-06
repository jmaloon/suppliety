import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/my-elements/Loader';
import CompanyPage from 'components/CompanyPage';

import { userHasCompany } from 'theme/utils';
import * as companyActions from 'actions/CompanyActions';
import * as connectionActions from 'actions/ConnectionActions';

class CompanyPageCntr extends Component {
  componentDidMount() {
    const { company, companyActions, match: { params: { companyId } } } = this.props;
    if (!company) companyActions.fetchCompany(companyId);
  }

  requestCompanyConnection = companyId => () => {
    this.props.connectionActions.requestCompanyConnection(companyId);
  };

  requestUserConnection = userId => () => {
    this.props.connectionActions.requestUserConnection(userId);
  };

  acceptUserConnection = userId => () => {
    this.props.connectionActions.acceptUserConnection(userId);
  };

  render() {
    const { currentUser, company, connected, myCompany, connectionRequested } = this.props;
    if (!company) return <Loader />;
    return (
      <CompanyPage
        currentUser={currentUser}
        company={company}
        connected={connected}
        connectionRequested={connectionRequested}
        myCompany={myCompany}
        requestCompanyConnection={this.requestCompanyConnection}
        requestUserConnection={this.requestUserConnection}
        acceptUserConnection={this.acceptUserConnection}
      />
    );
  }
}

export default connect(
  ({ auth, companies }, { match: { params: { companyId } } }) => ({
    currentUser: auth,
    company: companies.companies[companyId],
    connected:
      userHasCompany(auth) &&
      !!companies.companies[companyId] &&
      companies.companies[companyId].connections.includes(auth.company),
    connectionRequested:
      userHasCompany(auth) &&
      !!companies.companies[companyId] &&
      companies.companies[companyId].connectionRequestsReceived.includes(auth.company),
    myCompany: userHasCompany(auth) && auth.company === companyId
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch),
    connectionActions: bindActionCreators(connectionActions, dispatch)
  })
)(CompanyPageCntr);
