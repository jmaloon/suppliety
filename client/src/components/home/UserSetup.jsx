import React, { Fragment } from 'react';
import Typography from 'material-ui/Typography';
import UserForm from 'components/forms/UserForm';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

export default withStyles(styles)(({ auth, onSubmit }) => (
  <Fragment>
    <Typography variant="display1">
      Welcome, please edit your profile before continuing
    </Typography>
    <UserForm auth={auth} onSubmit={onSubmit} />
  </Fragment>
));
