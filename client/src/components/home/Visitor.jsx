import React from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 960px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});

export default withStyles(styles)(({ classes }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <Typography variant="display1">Welcome Visitor</Typography>
      <Button href="/auth/google" variant="raised" color="primary">
        Login With G+
      </Button>
    </div>
  </div>
));
