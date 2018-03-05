import React, { PureComponent, Fragment } from 'react';
import FetchUsers from 'containers/FetchUsers';
import UserCard from 'components/UserCard';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Phone from 'mdi-material-ui/Phone';
import Email from 'mdi-material-ui/Email';
import MapMarker from 'mdi-material-ui/MapMarker';

import { withStyles } from 'theme/utils';
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
  }
});

class CompanyPage extends PureComponent {
  render() {
    const { classes, company, connected } = this.props;
    return (
      <Fragment>
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
            <Typography>{company.about}</Typography>
          </section>
          <section>
            <Button color="primary" fullWidth>
              + Connect
            </Button>
          </section>
        </article>
        {connected && (
          <FetchUsers userIds={company.accounts}>
            {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
          </FetchUsers>
        )}
      </Fragment>
    );
  }
}
export default withStyles(styles)(CompanyPage);
