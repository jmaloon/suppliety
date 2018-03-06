import React, { PureComponent } from 'react';

import Typography from 'material-ui/Typography';
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

  render() {
    const { classes, children, user } = this.props;
    return (
      <div className={classes.root}>
        <img src={user.image || userDefault} alt={user.nameFirst} className={classes.avatar} />
        <div className="details">
          <Typography variant="title">{`${user.nameFirst} ${user.nameLast}`}</Typography>
          <Typography variant="caption">{user.title}</Typography>
        </div>
        <div>{children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(UserBar);
