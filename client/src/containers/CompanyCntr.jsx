import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/Loader';

import * as companyActions from 'actions/CompanyActions';

class CompanyCntr extends Component {
  state = this.getCompany(this.props);

  getCompany({ company, companyId }) {
    return { company };
  }
  componentDidMount() {
    this.fetchCompany(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCompany(nextProps);
    if (this.props.companyId !== nextProps.companyId) {
      this.setState(this.getCompany(nextProps));
    }
    if (this.props.fetchStatus !== nextProps.fetchStatus) {
      this.setState({ fetching: false });
    }
  }

  fetchCompany({ company, companyActions, companyId, params }) {
    if (company) {
      return this.setState({ company });
    }
    if (!company && this.state.fetching !== companyId) {
      this.setState({ fetching: companyId });
      companyActions.fetchCompany(companyId, params);
    }
  }
  render() {
    const { company } = this.state;
    if (company) {
      return this.props.children(company);
    }
    return <Loader />;
  }
}

export default connect(
  ({ companies }, { companyId }) => ({
    company: companies[companyId],
    fetchStatus: companies[companyId] && companies[companyId].status
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(CompanyCntr);
