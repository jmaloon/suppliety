import React, { Fragment } from 'react';

import CompanyCntr from 'containers/CompanyCntr';
import Typography from 'material-ui/Typography';
import CompanyCard from 'components/CompanyCard';
import { withStyles } from 'theme/utils';

// import userAvatar from 'assets/images/user-default.svg';

const styles = theme => ({});

export default withStyles(styles)(({ auth, company }) => {
  if (auth) {
    return (
      <Fragment>
        {/* <Typography variant="display1">
          {`Welcome${
            auth.nameFirst
              ? auth.nameFirst.padStart(auth.nameFirst.length + 2, ', ')
              : ''
          }`}
        </Typography> */}
        {auth &&
          auth.company && (
            <CompanyCntr companyId={auth.company.toString()}>
              {c => <CompanyCard company={c} />}
            </CompanyCntr>
          )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Typography variant="display1">Welcome</Typography>
    </Fragment>
  );
});
