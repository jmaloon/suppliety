import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'components/my-elements/Loader';
import CompanyPage from 'components/CompanyPage';

import { userHasCompany } from 'theme/utils';
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
    const { currentUser, company, connected, myCompany } = this.props;
    if (!company) return <Loader />;
    return (
      <CompanyPage
        currentUser={currentUser}
        company={company}
        connected={connected}
        myCompany={myCompany}
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
    myCompany: userHasCompany(auth) && auth.company === companyId
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(CompanyPageCntr);
