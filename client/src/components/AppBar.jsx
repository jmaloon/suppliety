import React, { Component, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { NavLink, Link } from 'react-router-dom';
import { withStyles } from 'theme/utils';

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
    width: 50,
    height: 50,
    padding: 5,
    margin: [[0, 10]],
    borderRadius: '50%',
    cursor: 'pointer'
  },
  menu: {
    '& a': {
      textDecoration: 'none',
      outline: 'none'
    }
  },
  activeLink: {
    color: [['red', '!important']]
  }
});

class MyAppBar extends Component {
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
            <NavLink to="/" exact activeClassName={classes.activeLink}>
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to="/discovery" exact activeClassName={classes.activeLink}>
              <Button color="inherit">Discovery</Button>
            </NavLink>
            {!currentUser ? (
              <a href="/auth/google">
                <Button color="inherit">Login With G+</Button>
              </a>
            ) : (
              <div ref={el => (this.menu = el)}>
                <img
                  src={currentUser.image || userDefault}
                  alt="avatar"
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
