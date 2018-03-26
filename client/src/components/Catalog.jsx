import React, { Component, Fragment } from "react";
import classNames from "classnames";

import Button from "material-ui/Button";
import Plus from "mdi-material-ui/Plus";
import ProductCard from "components/ProductCard";
import FetchProducts from "containers/FetchProducts";
import ProductForm from "components/forms/ProductForm";
import { withStyles, getCompanyImage } from "theme/utils";
import Typography from "material-ui/Typography";

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "auto 150px 450px auto",
    gridTemplateRows: "auto",
    gridTemplateAreas: "'. filter content .'"
  },
  content: {
    gridArea: "content",
    padding: 20
  },
  filter: {
    gridArea: "filter",
    "& > div": {
      padding: 20
    },
    "& > .refine": {
      backgroundColor: theme.palette.grey[300]
    }
  },
  tag: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    },
    "&.selected": {
      // backgroundColor: theme.palette.grey[200],
      "&::before": {
        content: '""',
        position: "absolute",
        left: -10,
        width: 5,
        height: 5,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  productContainer: {
    display: "flex",
    // justifyContent: "space-around",
    flexFlow: "row wrap"
  },
  [theme.breakpoints.only("xs")]: {
    container: {
      gridTemplateColumns: "auto",
      gridTemplateAreas: "'filter' 'content'"
    }
  }
});

class Catalog extends Component {
  state = {
    item: null,
    filter: {
      tags: []
    }
  };

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
    if (item === "create") return this.props.addProduct(data);
    return this.props.editProduct(data);
  };

  applyFilter = product => {
    const { filter } = this.state;
    if (!filter.tags.length) return true;
    return !filter.tags.some(tag => !product.tags.includes(tag));
  };

  toggleTag = tag => () => {
    const { filter: { tags } } = this.state;
    if (tags.includes(tag))
      return this.setState({
        filter: { ...this.state.filter, tags: tags.filter(t => t !== tag) }
      });
    return this.setState({
      filter: { ...this.state.filter, tags: [...tags, tag] }
    });
  };

  render() {
    const { classes, company, products = [] } = this.props;
    const { item, filter: { tags } } = this.state;
    const productTags = [].concat.apply([], products.map(p => p.tags));

    return (
      <div className={classes.container}>
        <div className={classes.filter}>
          <div>
            <img src={getCompanyImage(company)} alt={company.name} />
            {!!item ? (
              <Button
                fullWidth
                color="secondary"
                onClick={() => this.setState({ item: false })}
              >
                cancel
              </Button>
            ) : (
              <Button
                fullWidth
                color="primary"
                onClick={() => this.setState({ item: "create" })}
              >
                <Plus /> Create
              </Button>
            )}
          </div>
          <div className="refine">
            <Typography variant="subheading">Refine</Typography>
            {!!productTags.length && (
              <Fragment>
                <Typography variant="body2">Tags</Typography>
                {productTags.map((tag, i) => (
                  <div
                    key={i}
                    className={classNames(classes.tag, {
                      selected: tags.includes(tag)
                    })}
                    onClick={this.toggleTag(tag)}
                  >
                    <Typography noWrap>{tag}</Typography>
                  </div>
                ))}
              </Fragment>
            )}
          </div>
        </div>
        <div className={classes.content}>
          {!!item ? (
            <ProductForm onSubmit={this.onSubmit} product={item} />
          ) : (
            <div className={classes.productContainer}>
              <FetchProducts productIds={company.products}>
                {products =>
                  products
                    .filter(this.applyFilter)
                    .map(product => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onClick={() => this.setState({ item: product })}
                      />
                    ))
                }
              </FetchProducts>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Catalog);
