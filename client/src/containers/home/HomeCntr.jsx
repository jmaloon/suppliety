import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { HomeUnconnected, HomeUser, HomeSupplier } from 'components/home/Home';
import Loader from 'components/my-elements/Loader';
import FetchCompany from 'containers/FetchCompany';

// import * as companyActions from 'actions/CompanyActions';

class HomeCntr extends Component {
  render() {
    const { currentUser } = this.props;

    if (currentUser === null) return <Loader />;
    if (!currentUser) return <Redirect to="/discovery" />;
    if (!currentUser.companyAccepted) return <HomeUnconnected />;
    return (
      <FetchCompany companyId={currentUser.company}>
        {c => (c.type === 'Supplier' ? <HomeSupplier /> : <HomeUser />)}
      </FetchCompany>
    );
  }
}

export default connect(({ auth }) => ({
  currentUser: auth
}))(HomeCntr);
