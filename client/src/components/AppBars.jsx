import React, { PureComponent, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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

class AppBars extends PureComponent {
  render() {
    const { auth, classes } = this.props;
    return (
      <Fragment>
        <AppBar className={classes.root}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Suppliety
            </Typography>
            {!auth ? (
              <a href="/auth/google">
                <Button color="inherit">Login With G+</Button>
              </a>
            ) : (
              <a href="/api/logout">
                <Button color="inherit">Logout</Button>
              </a>
            )}
            {/* <Button color="inherit">Login With G+</Button> */}
          </Toolbar>
        </AppBar>
        <div className={classes.padder} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(AppBars);
