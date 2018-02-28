import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import AppBar from 'containers/AppBar';
import HomeCntr from 'containers/HomeCntr';

import * as authActions from 'actions/AuthActions';

class MainLayout extends Component {
  componentDidMount() {
    this.props.authActions.fetchUser();
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
  authActions: bindActionCreators(authActions, dispatch)
}))(MainLayout);
