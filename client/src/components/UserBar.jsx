import React, { PureComponent } from 'react';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import { withStyles } from 'theme/utils';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& .details': {
      flex: 1
    }
  },
  avatar: {
    width: 50,
    height: 50
  }
});

class UserBar extends PureComponent {
  state = { open: false };

  getActionButton() {
    const { currentUser, myCompany, requestUserConnection, acceptUserConnection, user } = this.props;
    if (myCompany) return null;
    //if connected, you can remove
    if (currentUser.connections.includes(user._id)) {
      return (
        <Button variant="raised" color="secondary">
          Remove
        </Button>
      );
    }
    //if they have requested, you can accept
    if (currentUser.connectionRequestsReceived.includes(user._id)) {
      return (
        <Button variant="raised" color="primary" onClick={acceptUserConnection(user._id)}>
          Accept
        </Button>
      );
    }
    //if you have requested, it is disabled and pending
    if (currentUser.connectionRequestsSent.includes(user._id)) {
      return (
        <Button variant="raised" color="primary" disabled={true}>
          Pending
        </Button>
      );
    }
    //if there is no status, you can request connection
    return (
      <Button variant="raised" color="primary" onClick={requestUserConnection(user._id)}>
        Connect
      </Button>
    );
  }

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <img src={user.image || userDefault} alt={user.nameFirst} className={classes.avatar} />
        <div className="details">
          <Typography variant="title">{`${user.nameFirst} ${user.nameLast}`}</Typography>
          <Typography variant="caption">{user.title}</Typography>
        </div>
        <div>{this.getActionButton()}</div>
      </div>
    );
  }
}

export default withStyles(styles)(UserBar);
