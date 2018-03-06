import React, { PureComponent } from 'react';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { withStyles } from 'theme/utils';
import Phone from 'mdi-material-ui/Phone';
import Email from 'mdi-material-ui/Email';
import MapMarker from 'mdi-material-ui/MapMarker';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > section': {
      display: 'flex',
      width: '100%'
    }
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  info: {
    display: 'flex',
    alignItems: 'center'
  },
  disabled: {
    color: theme.palette.common.black,
    fontSize: 14,
    '&:before': {
      display: 'none'
    }
  }
});

class CompanyCard extends PureComponent {
  state = {};

  render() {
    const { classes, company } = this.props;

    return (
      <article className={classes.root}>
        <section>
          <img src={company.image || companyDefault} alt="company logo" />
          <div className={classes.text}>
            <Typography variant="display1">{company.name}</Typography>
            {company.phone && (
              <Typography className={classes.info}>
                <Phone />
                {company.phone}
              </Typography>
            )}
            <Typography className={classes.info}>
              <MapMarker />
              {company.address} / {company.country}
            </Typography>
            {company.email && (
              <Typography className={classes.info}>
                <Email />
                {company.email}
              </Typography>
            )}
          </div>
        </section>
        <section>
          <TextField
            value={company.about}
            fullWidth
            multiline
            disabled
            InputProps={{
              classes: {
                disabled: classes.disabled
              }
            }}
          />
          {/* <textarea>{company.about}</textarea> */}
          {/* <Typography multiline>{company.about}</Typography> */}
        </section>
      </article>
    );
  }
}

export default withStyles(styles)(CompanyCard);
