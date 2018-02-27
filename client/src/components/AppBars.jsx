import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  flex: { flex: 1 }
});

class AppBars extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(AppBars);
