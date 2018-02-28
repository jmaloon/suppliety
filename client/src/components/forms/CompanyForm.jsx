import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'theme/utils';

const styles = theme => ({});
// const COMPANY = {
//   _id: 123,
//   name: "here''",
//   about: 'about',
//   country: 'country',
//   phone: '123 234 2343'
// };
class UserForm extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  getInitialState(props) {
    if (props && props.company) {
      const { _id, name, about, country, phone, type, subtype } = props.company;
      return { _id, name, about, country, phone, type, subtype };
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
    const { name = '', about = '', country = '', phone = '' } = this.state;
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <TextField
          autoComplete="organization"
          fullWidth
          label="Company Name"
          value={name}
          onChange={this.handleChange('name')}
        />
        <TextField
          multiline
          fullWidth
          label="About"
          value={about}
          onChange={this.handleChange('about')}
        />
        <TextField
          autoComplete="country-name"
          fullWidth
          label="Country"
          value={country}
          onChange={this.handleChange('country')}
        />
        <TextField
          autoComplete="tel"
          type="tel"
          fullWidth
          label="Phone"
          value={phone}
          onChange={this.handleChange('phone')}
        />
        <Button type="submit" onClick={this.onSubmit}>
          Done
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UserForm);
