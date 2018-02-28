import React, { Fragment } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

export default withStyles(styles)(({ auth }) => (
  <Fragment>
    <Typography variant="display1">
      {`Welcome${
        auth && auth.nameFirst
          ? auth.nameFirst.padStart(auth.nameFirst.length + 2, ', ')
          : ''
      }`}
    </Typography>
  </Fragment>
));
