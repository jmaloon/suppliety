import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBars from 'components/AppBars';

class AppBar extends Component {
  componentDidMount;
  render() {
    const { auth } = this.props;
    return <AppBars auth={auth} />;
  }
}

export default connect(({ auth }) => ({
  auth: auth
}))(AppBar);
