import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as companyActions from 'actions/CompanyActions';

class LoadCompanies extends Component {
  state = { companies: this.getCompanies(this.props) };

  getCompanies(props) {
    const { companies } = props;
    return Object.values(companies);
  }

  componentDidMount() {
    this.loadCompanies(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadCompanies(nextProps);
    if (this.props.loaded !== nextProps.loaded) {
      this.setState({
        loading: false,
        companies: this.getCompanies(nextProps)
      });
    }
  }

  loadCompanies({ companyActions, loaded, count, params }) {
    const requested = params.skip + params.limit;
    if (loaded !== count && requested > loaded && !this.state.loading) {
      this.setState({ loading: true });
      if (requested > count) {
        params.limit = count - params.skip;
      }
      companyActions.loadCompanies(params);
    }
  }
  render() {
    const { loaded, count } = this.props;
    const { companies, loading } = this.state;
    if (companies.length || !count) {
      return this.props.children(companies, loading, loaded === count);
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
)(LoadCompanies);
