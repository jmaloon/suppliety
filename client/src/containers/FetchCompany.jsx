import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as companyActions from 'actions/CompanyActions';

class FetchCompany extends Component {
  state = { company: this.props.company };

  componentDidMount() {
    this.fetchCompany(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCompany(nextProps);
    // debugger;
    if (
      this.props.companyId !== nextProps.companyId ||
      this.props.company !== nextProps.company
    ) {
      this.setState({ company: nextProps.company });
    }
  }

  fetchCompany({ company, companyActions, companyId }) {
    if (!company && this.state.fetching !== companyId) {
      this.setState({ fetching: companyId });
      companyActions.fetchCompany(companyId);
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
    company: companies.companies[companyId]
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(FetchCompany);
