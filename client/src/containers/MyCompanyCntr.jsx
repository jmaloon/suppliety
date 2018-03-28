import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import MyCompany from 'components/MyCompany';
import AddCompany from 'components/AddCompany';
import Loader from 'components/my-elements/Loader';

import * as companyActions from 'actions/CompanyActions';
import * as connectionActions from 'actions/ConnectionActions';

class MyCompanyCntr extends Component {
  componentDidMount() {
    this.loadCompany(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.loadCompany(nextProps);
  }

  loadCompany(props) {
    const { currentUser, company } = props;
    if (!!currentUser && !!currentUser.company && !company) {
      props.companyActions.fetchCompany(currentUser.company);
    }
  }

  onCreateCompany = companyData => {
    this.props.companyActions.createCompany(companyData);
  };

  onUpdateCompany = companyData => {
    const { company: { _id } } = this.props;
    this.props.companyActions.updateCompany(_id, companyData);
  };

  onAccountRequest = companyId => {
    this.props.connectionActions.accountRequest(companyId);
  };

  render() {
    const { currentUser, company } = this.props;
    // if logged out then redirect
    if (currentUser === false) return <Redirect to='/' />;
    // if currentuser but no company then show select/create page
    if (!!currentUser && !currentUser.company) {
      return <AddCompany onCreateCompany={this.onCreateCompany} onAccountRequest={this.onAccountRequest} />;
    }
    // if user not loaded or company not loaded show loading
    if (!company || !currentUser) return <Loader />;

    // return the my company page if user, company loaded
    return <MyCompany company={company} currentUser={currentUser} onSubmit={this.onUpdateCompany} />;
  }
}

export default connect(
  ({ auth, companies }) => ({
    currentUser: auth,
    company: !!auth && !!auth.company && companies.companies[auth.company]
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch),
    connectionActions: bindActionCreators(connectionActions, dispatch)
  })
)(MyCompanyCntr);
