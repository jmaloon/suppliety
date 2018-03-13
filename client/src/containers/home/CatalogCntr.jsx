import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Catalog from 'components/Catalog';

import * as productActions from 'actions/ProductActions';
class CatalogCntr extends Component {
  addProduct = data => {
    this.props.productActions.addProduct(data);
  };

  render() {
    const { company } = this.props;
    return <Catalog company={company} addProduct={this.addProduct} />;
  }
}

// if on this page we assume that the company
// has already been loaded and they are a supplier
export default connect(
  ({ auth, companies }) => ({
    company: companies.companies[auth.company]
  }),
  dispatch => ({
    productActions: bindActionCreators(productActions, dispatch)
  })
)(CatalogCntr);
