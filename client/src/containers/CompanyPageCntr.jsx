import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/my-elements/Loader';
import CompanyPage from 'components/CompanyPage';

import * as companyActions from 'actions/CompanyActions';

class CompanyPageCntr extends Component {
  componentDidMount() {
    const {
      company,
      companyActions,
      match: { params: { companyId } }
    } = this.props;
    if (!company) companyActions.fetchCompany(companyId);
  }
  render() {
    const { currentUser, company } = this.props;
    if (!company) return <Loader />;
    const connected =
      !!currentUser &&
      !!currentUser.company &&
      currentUser.companyAccepted &&
      company.connections.includes(currentUser.company);

    return (
      <CompanyPage
        currentUser={currentUser}
        company={company}
        connected={connected}
      />
    );
  }
}

export default connect(
  ({ auth, companies }, { match: { params: { companyId } } }) => ({
    currentUser: auth,
    company: companies.companies[companyId]
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(CompanyPageCntr);
