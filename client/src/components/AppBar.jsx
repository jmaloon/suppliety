import React, { Component, Fragment } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import AuthCntr from 'containers/AuthCntr';
import Modal from 'material-ui/Modal';
// import { NavLink, Link } from 'react-router-dom';
import { withStyles } from 'theme/utils';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    '& a': {
      color: 'inherit'
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
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    tabIndex: '-1'
  }
  // activeLink: {
  //   color: [['red', '!important']]
  // }
});

class MyAppBar extends Component {
  state = { menu: false, login: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentuser !== this.props.currentUser) {
      this.setState({ login: false });
    }
  }

  closeMenu = () => {
    this.setState({ menu: false });
  };

  logout = () => {
    this.closeMenu();
    this.props.logout();
  };

  render() {
    const { currentUser, classes } = this.props;
    const { menu, login } = this.state;
    return (
      <Fragment>
        <Modal open={login} onClose={() => this.setState({ login: false })} className={classes.modal}>
          <AuthCntr />
        </Modal>
        <AppBar className={classes.root}>
          <Toolbar>
            <Link to="/" className={classes.flex}>
              <Typography variant="title" color="inherit">
                Suppliety
              </Typography>
            </Link>
            {!!currentUser && (
              <Link to="/">
                <Button color="inherit">Home</Button>
              </Link>
            )}
            <Link to="/discovery">
              <Button color="inherit">Discovery</Button>
            </Link>
            {!currentUser && (
              <Button onClick={() => this.setState({ login: true })} color="inherit">
                Login
              </Button>
            )}
            {/* {!currentUser && (
              <Button href="/auth/google" color="inherit">
                Login With G+
              </Button>
            )} */}
            {!!currentUser && (
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
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
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
