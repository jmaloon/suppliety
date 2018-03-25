import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';
import ProductCard from 'components/ProductCard';
import FetchProducts from 'containers/FetchProducts';
import ProductForm from 'components/forms/ProductForm';
import { withStyles, getCompanyImage } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 150px 450px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. filter content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  filter: {
    gridArea: 'filter',
    padding: 20
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row wrap'
  },
  [theme.breakpoints.only('xs')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'filter' 'content'"
    }
  }
});

class Catalog extends Component {
  state = { item: null };

  onCreate = () => {
    this.setState({ item: null });
  };

  addProduct = data => {
    this.setState({ item: null });
    this.props.addProduct(data);
  };

  onSubmit = data => {
    const { item } = this.state;
    this.setState({ item: null });
    if (item === 'create') return this.props.addProduct(data);
    return this.props.editProduct(data);
  }

  render() {
    const { classes, company } = this.props;
    const { item } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.filter}>
          <img src={getCompanyImage(company)} alt={company.name} />
          {!!item ? (
            <Button fullWidth color="secondary" onClick={() => this.setState({ item: false })}>
              cancel
            </Button>
          ) : (
              <Button fullWidth color="primary" onClick={() => this.setState({ item: 'create' })}>
                <Plus /> Create
            </Button>
            )}
        </div>
        <div className={classes.content}>
          {!!item ? (
            <ProductForm onSubmit={this.onSubmit} product={item} />
          ) : (
              <div className={classes.productContainer}>
                <FetchProducts productIds={company.products}>
                  {products => products.map(product => <ProductCard key={product._id} product={product} onClick={() => this.setState({ item: product })} />)}
                </FetchProducts>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Catalog);
