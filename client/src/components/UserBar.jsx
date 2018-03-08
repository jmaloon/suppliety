import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import Email from 'mdi-material-ui/Email';
import Whatsapp from 'mdi-material-ui/Whatsapp';

import { withStyles } from 'theme/utils';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: [[5, 10]],
    borderRadius: 5,
    border: [[1, 'solid', theme.palette.grey[500]]]
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    '& .details': {
      flex: 1
    }
  },
  toggle: {
    cursor: 'pointer'
  },
  avatar: {
    width: 50,
    height: 50
  },
  info: {
    display: 'flex',
    alignItems: 'center'
  }
});

class UserBar extends PureComponent {
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
    const { classes, user, open, onToggle } = this.props;
    // const { open } = this.state;
    console.log(user);
    return (
      <article className={classes.root}>
        <div className={classNames(classes.top, { [classes.toggle]: !!onToggle })} onClick={onToggle}>
          <img src={user.image || userDefault} alt={user.nameFirst} className={classes.avatar} />
          <div className="details">
            <Typography variant="title">{`${user.nameFirst} ${user.nameLast}`}</Typography>
            <Typography variant="caption">{user.title}</Typography>
          </div>
          <div>{this.getActionButton()}</div>
        </div>
        <Collapse in={open}>
          <div className={classes.bottom}>
            {user.email && (
              <Typography className={classes.info}>
                <Email />
                {user.email}
              </Typography>
            )}
            {user.whatsApp && (
              <Typography className={classes.info}>
                <Whatsapp />
                {user.whatsApp}
              </Typography>
            )}
          </div>
        </Collapse>
      </article>
    );
  }
}

export default withStyles(styles)(UserBar);
