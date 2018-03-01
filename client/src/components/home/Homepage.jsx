import React, { Fragment } from 'react';

import FetchCompany from 'containers/FetchCompany';
import FetchUsers from 'containers/FetchUsers';
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
            <FetchCompany companyId={auth.company.toString()}>
              {c => (
                <Fragment>
                  <CompanyCard company={c} />
                  <FetchUsers userIds={c.accounts}>
                    {users => <Typography>Users loaded</Typography>}
                  </FetchUsers>
                </Fragment>
              )}
            </FetchCompany>
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
