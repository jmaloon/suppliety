import React, { PureComponent } from 'react';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { withStyles } from 'theme/utils';

import companyDefault from 'assets/images/company-default.svg';

const styles = {
  root: {
    margin: [[0, 5]]
  },
  image: {
    width: '100%'
  }
};

class TileItem extends PureComponent {
  getTileImage() {
    const { classes, image, title, type } = this.props;
    const src = image
      ? image
      : type === 'company' ? companyDefault : companyDefault;

    return <img src={src} alt={title} className={classes.image} />;
  }

  render() {
    const { action, classes, title, subtitle } = this.props;
    return (
      <GridListTile className={classes.root}>
        {this.getTileImage()}
        <GridListTileBar
          title={title}
          subtitle={subtitle}
          actionIcon={action}
        />
      </GridListTile>
    );
  }
}

// export default TileItem;
export default withStyles(styles)(TileItem);
