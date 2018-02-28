import React from 'react';
import { withStyles } from 'theme/utils';
// import AppBars from './AppBars';
import Typography from 'material-ui/Typography';

const styles = theme => ({});

export default withStyles(styles)(({ className }) => (
  <div className={className}>
    <Typography variant="title">Suppliety</Typography>
  </div>
));
