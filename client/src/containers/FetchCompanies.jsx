import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as companyActions from 'actions/CompanyActions';

class FetchCompanies extends Component {
  state = { companies: this.getCompanies(this.props) };

  getCompanies(props) {
    const { companies } = props;
    return Object.values(companies);
  }

  componentDidMount() {
    this.fetchCompanies(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCompanies(nextProps);
    if (this.props.loaded !== nextProps.loaded) {
      this.setState({
        fetching: false,
        companies: this.getCompanies(nextProps)
      });
    }
  }

  fetchCompanies({ companyActions, loaded, count, params }) {
    const requested = params.skip + params.limit;
    if (loaded !== count && requested > loaded && !this.state.fetching) {
      this.setState({ fetching: true });
      if (requested > count) {
        params.limit = count - params.skip;
      }
      companyActions.fetchCompanies(params);
    }
  }
  render() {
    const { loaded, count } = this.props;
    const { companies, fetching } = this.state;
    if (companies.length) {
      return this.props.children(companies, fetching, loaded === count);
    }
    return <Loader />;
  }
}

export default connect(
  ({ companies }) => ({
    companies: companies.companies,
    loaded: companies.status.loaded,
    count: companies.status.count
  }),
  dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
  })
)(FetchCompanies);
