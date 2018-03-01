import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import AppBar from 'containers/AppBar';
import HomeCntr from 'containers/HomeCntr';

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
          <AppBar />
          <Route path="/" exact component={HomeCntr} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  companyActions: bindActionCreators(companyActions, dispatch)
}))(MainLayout);
