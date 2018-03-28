import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/my-elements/Loader';
import CompanyPage from 'components/CompanyPage';

import { userHasCompany } from 'theme/utils';
import * as companyActions from 'actions/CompanyActions';
import * as connectionActions from 'actions/ConnectionActions';
import * as userActions from 'actions/UserActions';

class CompanyPageCntr extends Component {
  componentDidMount() {
    const { company, companyActions, match: { params: { companyId } } } = this.props;
    if (!company) companyActions.fetchCompany(companyId);
  }

  acceptCompanyRequest = companyId => () => {
    this.props.connectionActions.acceptCompanyRequest(companyId);
  };

  requestCompanyConnection = companyId => () => {
    this.props.connectionActions.requestCompanyConnection(companyId);
  };

  requestUserConnection = userId => () => {
    this.props.connectionActions.requestUserConnection(userId);
  };

  acceptUserConnection = userId => () => {
    this.props.connectionActions.acceptUserConnection(userId);
  };

  addProductToUser = productId => {
    this.props.userActions.addProduct(productId)
  }

  removeProductFromUser = productId => {
    this.props.userActions.removeProduct(productId)
  }

  render() {
    const { currentUser, company, connected, myCompany, connectionRequestSent, connectionRequestReceived } = this.props;
    if (!company) return <Loader />;
    return (
      <CompanyPage
        currentUser={currentUser}
        company={company}
        connected={connected}
        connectionRequestSent={connectionRequestSent}
        connectionRequestReceived={connectionRequestReceived}
        myCompany={myCompany}
        acceptCompanyRequest={this.acceptCompanyRequest}
        requestCompanyConnection={this.requestCompanyConnection}
        requestUserConnection={this.requestUserConnection}
        acceptUserConnection={this.acceptUserConnection}
        addProductToUser={this.addProductToUser}
        removeProductFromUser={this.removeProductFromUser}
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
    connectionRequestSent:
      userHasCompany(auth) &&
      !!companies.companies[companyId] &&
      companies.companies[companyId].connectionRequestsReceived.includes(auth.company),
    connectionRequestReceived:
      userHasCompany(auth) &&
      !!companies.companies[companyId] &&
      companies.companies[companyId].connectionRequestsSent.includes(auth.company),
    myCompany: userHasCompany(auth) && auth.company === companyId
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch),
    connectionActions: bindActionCreators(connectionActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(CompanyPageCntr);
