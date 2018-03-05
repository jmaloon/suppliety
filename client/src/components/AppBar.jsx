import React, { PureComponent, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  root: {
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  flex: { flex: 1 },
  padder: theme.mixins.toolbar
});

class MyAppBar extends PureComponent {
  render() {
    const { currentUser, classes } = this.props;
    return (
      <Fragment>
        <AppBar className={classes.root}>
          <Toolbar>
            <Link to="/" className={classes.flex}>
              <Typography variant="title" color="inherit">
                Suppliety
              </Typography>
            </Link>
            <Link to="/discovery">
              <Button color="inherit">Discovery</Button>
            </Link>
            {!currentUser ? (
              <Button href="/auth/google" color="inherit">
                Login With G+
              </Button>
            ) : (
              <Button href="/api/logout" color="inherit">
                Logout
              </Button>
            )}
            {/* <Button color="inherit">Login With G+</Button> */}
          </Toolbar>
        </AppBar>
        <div className={classes.padder} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(MyAppBar);
