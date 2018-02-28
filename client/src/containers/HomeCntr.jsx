import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'theme/utils';

import Home from 'components/Home';
import UserForm from 'components/UserForm';
import Typography from 'material-ui/Typography';

import * as userActions from 'actions/UserActions';

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

class HomeCntr extends Component {
  onSubmit = userData => {
    console.log(userData);
    this.props.userActions.updateUser(userData);
  };

  render() {
    const { auth, classes } = this.props;

    return (
      <div className={classes.container}>
        {auth && !auth.edited ? (
          <div className={classes.content}>
            <Typography variant="display1">
              Welcome, please edit your profile before continuing
            </Typography>
            <UserForm auth={auth} onSubmit={this.onSubmit} />
          </div>
        ) : (
          <div className={classes.content}>
            <Typography variant="display2">Welcome to Suppliety</Typography>
            <Home auth={auth} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({
    auth: auth
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(withStyles(styles)(HomeCntr));
