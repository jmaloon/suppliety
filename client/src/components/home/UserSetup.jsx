import React, { Fragment } from 'react';
import Typography from 'material-ui/Typography';
import UserForm from 'components/forms/UserForm';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

export default withStyles(styles)(({ currentUser, onSubmit }) => (
  <Fragment>
    <Typography variant="display1">
      Welcome, please edit your profile before continuing
    </Typography>
    <UserForm currentUser={currentUser} onSubmit={onSubmit} />
  </Fragment>
));
