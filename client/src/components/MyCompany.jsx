import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Select from 'components/my-elements/Select';

import companyDefault from 'assets/images/company-default.svg';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 600px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& form > div': {
      margin: [[10, 0]]
    }
  },
  [theme.breakpoints.only('xs')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 10
  }
});

const TYPE_ITEMS = [{ value: 'Supplier', text: 'Supplier' }, { value: 'Buyer', text: 'Buyer' }];

class MyProfile extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  getInitialState(props) {
    if (props && props.company) {
      const { _id, name, about, country, phone, email, type, subtype, address, facebook, instagram, image } = props.company;
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
        instagram,
        image
      };
    }
    return {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { classes, currentUser } = this.props;

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
      instagram = '',
      image
    } = this.state;

    const disabled = !currentUser.admin;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography variant="display1">My Company</Typography>
          <img src={image || companyDefault} alt="company" className={classes.image} />
          <form onSubmit={this.onSubmit} autoComplete="off">
            <TextField
              autoComplete="organization"
              fullWidth
              disabled={disabled}
              label="Company Name"
              value={name}
              onChange={this.handleChange('name')}
            />
            <Select
              fullWidth
              disabled={disabled}
              label="Type"
              value={type}
              onChange={this.handleChange('type')}
              items={TYPE_ITEMS}
            />
            <TextField
              multiline
              fullWidth
              disabled={disabled}
              label="About"
              value={about}
              onChange={this.handleChange('about')}
            />
            <TextField
              autoComplete="address-line1"
              fullWidth
              disabled={disabled}
              label="Address"
              value={address}
              onChange={this.handleChange('address')}
            />
            <TextField
              autoComplete="country-name"
              fullWidth
              disabled={disabled}
              label="Country"
              value={country}
              onChange={this.handleChange('country')}
            />
            <TextField
              autoComplete="email"
              fullWidth
              disabled={disabled}
              label="Email"
              value={email}
              onChange={this.handleChange('email')}
            />
            <TextField
              autoComplete="tel"
              type="tel"
              fullWidth
              disabled={disabled}
              label="Phone"
              value={phone}
              onChange={this.handleChange('phone')}
            />
            <TextField
              fullWidth
              disabled={disabled}
              label="Facebook"
              value={facebook}
              onChange={this.handleChange('facebook')}
            />
            <TextField
              fullWidth
              disabled={disabled}
              label="Instagram"
              value={instagram}
              onChange={this.handleChange('instagram')}
            />

            <Button fullWidth variant="raised" color="primary" type="submit" onClick={this.onSubmit}>
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MyProfile);
