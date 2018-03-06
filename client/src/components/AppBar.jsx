import React, { PureComponent, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { withStyles, userHasCompany } from 'theme/utils';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  flex: { flex: 1 },
  padder: theme.mixins.toolbar,
  image: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  menu: {
    '& a': {
      textDecoration: 'none',
      outline: 'none'
    }
  }
});

class MyAppBar extends PureComponent {
  state = { menu: false };

  closeMenu = () => {
    this.setState({ menu: false });
  };

  render() {
    const { currentUser, classes } = this.props;
    const { menu } = this.state;
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
              <div ref={el => (this.menu = el)}>
                <img
                  src={currentUser.image || userDefault}
                  className={classes.image}
                  onClick={() => this.setState({ menu: !menu })}
                />
                <Menu open={menu} anchorEl={this.menu} onClose={this.closeMenu} className={classes.menu}>
                  <Link to="/my-profile">
                    <MenuItem onClick={this.closeMenu}>My Profile</MenuItem>
                  </Link>
                  <Link to="/my-company">
                    <MenuItem onClick={this.closeMenu}>My Company</MenuItem>
                  </Link>
                  <a href="/api/logout">
                    <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
                  </a>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div className={classes.padder} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(MyAppBar);
