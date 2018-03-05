import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';
import At from 'mdi-material-ui/At';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1
  },
  avatar: { height: 70, width: 70 },
  info: { flex: 1 },
  actions: { display: 'flex', alignItems: 'center' }
});

class CompanyCard extends PureComponent {
  state = {};

  render() {
    const { classes, paper } = this.props;
    if (paper) {
      return <Paper className={classes.root}>{this.renderContent()}</Paper>;
    }
    return <div className={classes.root}>{this.renderContent()}</div>;
  }

  renderContent() {
    const { classes, children, user } = this.props;

    return (
      <article className={classes.root}>
        <img
          src={user.image || userDefault}
          alt="user avatar"
          className={classes.avatar}
        />
        <div className={classes.info}>
          <Typography variant="display1">
            {`${user.nameFirst} ${user.nameLast}`}
          </Typography>
          {user.email && (
            <Typography>
              <At />
              {user.email}
            </Typography>
          )}
        </div>
        <div className={classes.actions}>{children}</div>
      </article>
    );
  }
}

export default withStyles(styles)(CompanyCard);
