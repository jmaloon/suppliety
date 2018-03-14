import React, { PureComponent } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { withStyles } from 'theme/utils';

const styles = {
  paper: { padding: 20 },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    // padding: 20,
    '& > *': {
      marginBottom: 10
    }
  }
};

class AuthForm extends PureComponent {
  state = { username: '' };

  handleChange = field => evt => {
    this.setState({ [field]: evt.target.value });
  };

  // onSignup = () => {
  //   const { username } = this.state;
  //   if (!!username) this.props.onSignup({ username });
  // };

  onLogin = evt => {
    evt.preventDefault();
    const { username } = this.state;
    if (!!username) this.props.onLogin({ username });
  };

  render() {
    const { username } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="headline">Login</Typography>
        <Typography variant="caption">Enter your username to login or register.</Typography>
        <Typography variant="caption">There are no passwords as this product is in beta.</Typography>
        <form onSubmit={this.onLogin} className={classes.form}>
          <TextField autoFocus={true} label="Username" value={username} onChange={this.handleChange('username')} />
          {/* <TextField disabled={true} label="Password" value={password} onChange={this.handleChange('password')} /> */}
          <Button type="submit" variant="raised" color="primary" onClick={this.onLogin}>
            Login
          </Button>
          {/* <Button variant="raised" color="secondary" onClick={this.onSignup}>
          Register
        </Button> */}
        </form>
      </Paper>
    );
  }
}
export default withStyles(styles)(AuthForm);
