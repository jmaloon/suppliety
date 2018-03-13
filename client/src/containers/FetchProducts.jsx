import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from 'components/my-elements/Loader';

import * as productActions from 'actions/ProductActions';

class FetchProducts extends Component {
  state = { products: this.getProducts(this.props) };

  getProducts({ products, fetchProductIds }) {
    return !fetchProductIds.length && products;
  }

  componentDidMount() {
    this.fetchProducts(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.productIds !== nextProps.productIds) {
      this.fetchProducts(nextProps);
    }
    if (this.props.fetchProductIds !== nextProps.fetchProductIds) {
      this.setState({
        fetching: false,
        products: this.getProducts(nextProps)
      });
    }
  }

  fetchProducts({ products, fetchProductIds }) {
    if (!!fetchProductIds.length && this.state.fetching !== fetchProductIds) {
      this.setState({ fetching: fetchProductIds });
      this.props.productActions.fetchProducts(fetchProductIds);
    }
  }
  render() {
    const { productIds = [] } = this.props;
    const { products } = this.state;

    if (!productIds.length) {
      return 'There are no products to show here';
    }

    if (products) {
      return this.props.children(products);
    }
    return <Loader />;
  }
}

export default connect(
  ({ products }, { productIds }) => ({
    products: productIds.map(id => products[id]),
    fetchProductIds: productIds.filter(id => !products[id])
  }),
  dispatch => ({
    productActions: bindActionCreators(productActions, dispatch)
  })
)(FetchProducts);
