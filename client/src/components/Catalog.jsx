import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';

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

  render() {
    const { classes, company } = this.props;
    const { create } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.filter}>
          <img src={getCompanyImage(company)} alt={company.name} />
          {create ? (
            <Button fullWidth variant="raised" color="primary" onClick={this.onCreate}>
              Save
            </Button>
          ) : (
            <Button fullWidth color="secondary" onClick={() => this.setState({ create: true })}>
              <Plus /> Create
            </Button>
          )}
        </div>
        <div className={classes.content}>
          <ProductForm />
          {create ? <h1>Create</h1> : <h1>Catalog</h1>}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Catalog);
