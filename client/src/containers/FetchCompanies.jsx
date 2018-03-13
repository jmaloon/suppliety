import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as companyActions from 'actions/CompanyActions';

class FetchCompanies extends Component {
  state = { companies: this.getCompanies(this.props) };

  getCompanies({ companies, fetchCompanyIds }) {
    return !fetchCompanyIds.length && companies;
  }

  componentDidMount() {
    this.fetchCompanies(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.companyIds !== nextProps.companyIds) {
      this.fetchCompanies(nextProps);
    }
    if (this.props.fetchCompanyIds !== nextProps.fetchCompanyIds) {
      this.setState({
        fetching: false,
        companies: this.getCompanies(nextProps)
      });
    }
  }

  fetchCompanies({ companies, companyActions, companyIds, fetchCompanyIds }) {
    if (!!fetchCompanyIds.length && this.state.fetching !== fetchCompanyIds) {
      this.setState({ fetching: fetchCompanyIds });
      companyActions.fetchCompanies(fetchCompanyIds);
    }
  }
  render() {
    const { companyIds } = this.props;
    const { companies } = this.state;
    if (!companyIds.length) {
      return 'There are no companies to show here';
    }

    if (companies) {
      return this.props.children(companies);
    }
    return <Loader />;
  }
}

export default connect(
  ({ companies }, { companyIds }) => ({
    companies: companyIds.map(id => companies.companies[id]),
    fetchCompanyIds: companyIds.filter(id => !companies.companies[id])
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(FetchCompanies);
