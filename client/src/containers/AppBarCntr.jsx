import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'components/AppBar';

class AppBarCntr extends Component {
  render() {
    const { currentUser } = this.props;
    return <AppBar currentUser={currentUser} />;
  }
}

export default connect(({ auth }) => ({
  currentUser: auth
}))(AppBarCntr);
