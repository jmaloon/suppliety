import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

class UserForm extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  getInitialState(props) {
    if (props && props.auth) {
      const { _id, nameFirst, nameFamily, email } = props.auth;
      return { _id, nameFirst, nameFamily, email };
    }
    return {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = evt => {
    const { onSubmit } = this.props;
    evt.preventDefault();

    onSubmit(this.state);
  };

  render() {
    const { email, nameFirst, nameFamily, className } = this.props;
    return (
      <form className={className} onSubmit={this.onSubmit}>
        <TextField
          autoComplete="family-name"
          fullWidth
          label="First Name"
          value={nameFirst}
          onChange={this.handleChange('nameFirst')}
        />
        <TextField
          autoComplete="given-name"
          fullWidth
          label="Last Name"
          value={nameFamily}
          onChange={this.handleChange('nameFamily')}
        />
        <TextField
          autoComplete="email"
          fullWidth
          label="Email"
          value={email}
          onChange={this.handleChange('email')}
        />
        <Button type="submit" onClick={this.onSubmit}>
          Done
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UserForm);
