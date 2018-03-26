import React, { PureComponent } from "react";

import Typography from "material-ui/Typography";
import { withStyles } from "theme/utils";
import At from "mdi-material-ui/At";

import { getUserImage } from "theme/utils";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3]
  },
  avatar: {
    height: 70,
    width: 70
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit
  }
});

class UserCard extends PureComponent {
  state = {};

  render() {
    const { classes, children, user } = this.props;

    return (
      <article className={classes.root}>
        <Typography variant="headline">{`${user.nameFirst} ${
          user.nameLast
        }`}</Typography>
        <img
          src={getUserImage(user)}
          alt="user avatar"
          className={classes.avatar}
        />
        <div className={classes.info}>
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

export default withStyles(styles)(UserCard);
