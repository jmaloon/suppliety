import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import AppBarCntr from 'containers/AppBarCntr';
import HomeCntr from 'containers/home/HomeCntr';
import DiscoveryCntr from 'containers/DiscoveryCntr';
import CompanyPageCntr from 'containers/CompanyPageCntr';
import MyProfileCntr from 'containers/MyProfileCntr';
import MyCompanyCntr from 'containers/MyCompanyCntr';

import * as authActions from 'actions/AuthActions';
import * as companyActions from 'actions/CompanyActions';

class MainLayout extends Component {
  componentDidMount() {
    this.props.authActions.fetchUser();
    this.props.companyActions.getCount();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBarCntr />
          <Route path="/" exact component={HomeCntr} />
          <Route path="/discovery" exact component={DiscoveryCntr} />
          <Route path="/company/:companyId" exact component={CompanyPageCntr} />
          <Route path="/my-profile" exact component={MyProfileCntr} />
          <Route path="/my-company" exact component={MyCompanyCntr} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  companyActions: bindActionCreators(companyActions, dispatch)
}))(MainLayout);
