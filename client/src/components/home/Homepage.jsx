import React, { Fragment } from 'react';

import FetchCompany from 'containers/FetchCompany';
import FetchUsers from 'containers/FetchUsers';
import Typography from 'material-ui/Typography';
import CompanyCard from 'components/CompanyCard';
import UserCard from 'components/UserCard';
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
            <FetchCompany companyId={auth.company}>
              {c => (
                <Fragment>
                  <CompanyCard company={c} />
                  <FetchUsers userIds={c.accounts}>
                    {users =>
                      users.map(u => <UserCard key={u._id} paper user={u} />)
                    }
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
