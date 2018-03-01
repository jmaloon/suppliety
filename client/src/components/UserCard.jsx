import React, { PureComponent, Fragment } from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';
import At from 'mdi-material-ui/At';

import userDefault from 'assets/images/user-default.svg';

const styles = theme => ({
  root: {
    display: 'flex'
  }
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
    const { user } = this.props;
    console.log(user);
    return (
      <Fragment>
        <img src={user.image || userDefault} alt="user avatar" />
        <div>
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
      </Fragment>
    );
  }
}

export default withStyles(styles)(CompanyCard);
