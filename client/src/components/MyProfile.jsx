import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import userDefault from 'assets/images/user-default.svg';
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
  avatar: {
    height: 200,
    width: 200,
    marginTop: 10
  }
});

class MyProfile extends PureComponent {
  state = { ...this.getInitialState(this.props) };

  getInitialState(props) {
    if (!!props && props.currentUser) {
      const { _id, nameFirst, nameLast, email, phone, title, whatsApp, image } = props.currentUser;
      return { _id, nameFirst, nameLast, email, phone, title, whatsApp, image };
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
    const { classes } = this.props;
    const { email = '', nameFirst = '', nameLast = '', phone = '', title = '', whatsApp = '', image } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography variant="display1">My Profile</Typography>
          <img src={image || userDefault} alt="profile pic" className={classes.avatar} />
          <form onSubmit={this.onSubmit}>
            <TextField
              autoComplete="given-name"
              fullWidth
              label="First Name"
              value={nameFirst}
              onChange={this.handleChange('nameFirst')}
            />
            <TextField
              autoComplete="family-name"
              fullWidth
              label="Last Name"
              value={nameLast}
              onChange={this.handleChange('nameLast')}
            />
            <TextField
              autoComplete="title"
              fullWidth
              label="Job Title"
              value={title}
              onChange={this.handleChange('title')}
            />
            <TextField autoComplete="email" fullWidth label="Email" value={email} onChange={this.handleChange('email')} />
            <TextField autoComplete="phone" fullWidth label="Phone" value={phone} onChange={this.handleChange('phone')} />
            <TextField
              autoComplete="whatsApp"
              fullWidth
              label="WhatsApp"
              value={whatsApp}
              onChange={this.handleChange('whatsApp')}
            />
            <Button type="submit" variant="raised" color="primary" onClick={this.onSubmit} fullWidth>
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MyProfile);
