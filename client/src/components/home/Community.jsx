import React from 'react';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles, getUsername } from 'theme/utils';

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
  buttons: {
    display: 'flex',
    '& a': {
      flex: 1,
      textDecoration: 'none',
      margin: 5
    }
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});

export default withStyles(styles)(({ classes, currentUser }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <Typography variant="display1">{`Welcome ${getUsername(currentUser)}`}</Typography>
      <div className={classes.buttons}>
        <Link to="/my-profile">
          <Button variant="raised" color="primary" fullWidth>
            {`${!!currentUser.edited ? 'View' : 'Build'} Profile`}
          </Button>
        </Link>
        <Link to="/my-company">
          <Button variant="raised" color="primary" fullWidth>
            {`${!!currentUser.company ? 'View' : 'Add'} Company`}
          </Button>
        </Link>
      </div>
    </div>
  </div>
));
