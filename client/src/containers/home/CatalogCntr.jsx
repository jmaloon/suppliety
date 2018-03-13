import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Catalog from 'components/Catalog';

class CatalogCntr extends Component {
  render() {
    const { company } = this.props;
    return <Catalog company={company} />;
  }
}

// if on this page we assume that the company
// has already been loaded and they are a supplier
export default connect(
  ({ auth, companies }) => ({
    company: companies.companies[auth.company]
  }),
  null
)(CatalogCntr);
