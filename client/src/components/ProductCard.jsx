import React, { PureComponent } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles, getProductImage } from 'theme/utils';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    padding: 5,
    margin: 5,
    backgroundColor: theme.palette.common.white,
    border: [[1, 'solid', theme.palette.common.white]],
    cursor: 'pointer',
    '&:hover': {
      border: [[1, 'solid', theme.palette.common.black]]
    },
    '& img': {
      alignSelf: 'center',
      // width: '80%'
    }
  }
});

class ProductCard extends PureComponent {
  render() {
    const { classes, product, onClick } = this.props;
    return (
      <div className={classes.root} onClick={onClick} >
        <Typography variant="title" noWrap>
          {product.title}
        </Typography>
        <img src={getProductImage(product.image)} alt={product.title} />
        <Typography noWrap>{product.description}</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(ProductCard);
