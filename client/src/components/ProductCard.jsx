import React, { PureComponent } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles, getProductImage } from 'theme/utils';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    cursor: 'pointer',
    '& img': {
      alignSelf: 'center',
      width: '80%'
    }
  }
};

class ProductCard extends PureComponent {
  render() {
    const { classes, product, onClick } = this.props;
    return (
      <div className={classes.root} onClick={onClick} >
        <Typography variant="title" noWrap>
          {product.title}
        </Typography>
        <img src={getProductImage(product.image)} alt={product.title} />
        <Typography>{product.description}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(ProductCard);
