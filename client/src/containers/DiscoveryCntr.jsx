import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Discovery from 'components/Discovery';
import * as companyActions from 'actions/CompanyActions';

class DiscoveryCntr extends Component {
  componentDidMount() {
    const params = {
      skip: 0,
      limit: 10,
      sort: { created: 1 }
    };
    this.props.companyActions.loadCompanies(params);
  }

  render() {
    const { currentUser, companies } = this.props;

    return <Discovery currentUser={currentUser} companies={companies} />;
  }
}

export default connect(
  ({ auth, companies }) => ({
    currentUser: auth,
    companies: Object.values(companies.companies)
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(DiscoveryCntr);
