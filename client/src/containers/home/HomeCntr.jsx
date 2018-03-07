import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HomeVisitor, HomeUser } from 'components/home/Home';

class HomeCntr extends Component {
  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return <HomeVisitor />;
    }
    return <HomeUser />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  null
)(HomeCntr);
