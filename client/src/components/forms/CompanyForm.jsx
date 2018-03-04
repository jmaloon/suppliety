import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'components/my-elements/Select';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

const TYPE_ITEMS = [
  { value: 'Supplier', text: 'Supplier' },
  { value: 'Buyer', text: 'Buyer' }
];

class UserForm extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  getInitialState(props) {
    if (props && props.company) {
      const {
        _id,
        name,
        about,
        country,
        phone,
        email,
        type,
        subtype,
        address,
        facebook,
        instagram
      } = props.company;
      return {
        _id,
        name,
        about,
        country,
        phone,
        email,
        type,
        subtype,
        address,
        facebook,
        instagram
      };
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
    const {
      name = '',
      about = '',
      country = '',
      email = '',
      phone = '',
      type = '',
      // subtype = '',
      address = '',
      facebook = '',
      instagram = ''
    } = this.state;
    return (
      <form onSubmit={this.onSubmit} autoComplete="off">
        <TextField
          autoComplete="organization"
          fullWidth
          label="Company Name"
          value={name}
          onChange={this.handleChange('name')}
        />
        <Select
          fullWidth
          label="Type"
          value={type}
          onChange={this.handleChange('type')}
          items={TYPE_ITEMS}
        />
        <TextField
          multiline
          fullWidth
          label="About"
          value={about}
          onChange={this.handleChange('about')}
        />
        <TextField
          autoComplete="address-line1"
          fullWidth
          label="Address"
          value={address}
          onChange={this.handleChange('address')}
        />
        <TextField
          autoComplete="country-name"
          fullWidth
          label="Country"
          value={country}
          onChange={this.handleChange('country')}
        />
        <TextField
          autoComplete="email"
          fullWidth
          label="Email"
          value={email}
          onChange={this.handleChange('email')}
        />
        <TextField
          autoComplete="tel"
          type="tel"
          fullWidth
          label="Phone"
          value={phone}
          onChange={this.handleChange('phone')}
        />
        <TextField
          fullWidth
          label="Facebook"
          value={facebook}
          onChange={this.handleChange('facebook')}
        />
        <TextField
          fullWidth
          label="Instagram"
          value={instagram}
          onChange={this.handleChange('instagram')}
        />

        <Button type="submit" onClick={this.onSubmit}>
          Done
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UserForm);
