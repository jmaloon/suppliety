import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';

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
  [theme.breakpoints.only('xs')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'filter' 'content'"
    }
  }
});

class Catalog extends Component {
  state = { create: false };

  onCreate = () => {
    this.setState({ create: false });
  };

  addProduct = data => {
    this.setState({ create: false });
    this.props.addProduct(data);
  };

  render() {
    const { classes, company, addProduct } = this.props;
    const { create } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.filter}>
          <img src={getCompanyImage(company)} alt={company.name} />
          {create ? (
            <Button fullWidth color="secondary" onClick={() => this.setState({ create: false })}>
              cancel
            </Button>
          ) : (
            <Button fullWidth color="primary" onClick={() => this.setState({ create: true })}>
              <Plus /> Create
            </Button>
          )}
        </div>
        <div className={classes.content}>
          {create ? (
            <ProductForm onSubmit={this.addProduct} />
          ) : (
            <FetchProducts productIds={company.products}>
              {products =>
                products.map(product => (
                  <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                  </div>
                ))
              }
            </FetchProducts>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Catalog);
