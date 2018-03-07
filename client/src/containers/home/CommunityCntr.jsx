import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Community from 'components/home/Community';

class CommunityCntr extends Component {
  render() {
    const { currentUser } = this.props;
    return <Community currentUser={currentUser} />;
  }
}

export default connect(
  ({ auth }) => ({
    currentUser: auth
  }),
  null
)(CommunityCntr);
