import React, { PureComponent, Fragment } from 'react';
import CompanyDetails from 'components/CompanyDetails';
import FetchUsers from 'containers/FetchUsers';
import UserBar from 'components/UserBar';
import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 960px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});

class CompanyPage extends PureComponent {
  render() {
    const {
      classes,
      company,
      connected,
      connectionRequested,
      currentUser,
      myCompany,
      onCompanyConnect,
      requestCompanyConnection,
      requestUserConnection
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <CompanyDetails company={company} />

          {!myCompany &&
            !connected && (
              <Button
                variant="raised"
                color="secondary"
                fullWidth
                disabled={connectionRequested}
                onClick={requestCompanyConnection(company._id)}
              >
                {connectionRequested ? (
                  'Connection Pending'
                ) : (
                  <Fragment>
                    <Plus /> Connect
                  </Fragment>
                )}
              </Button>
            )}
          {(connected || myCompany) && (
            <FetchUsers userIds={company.accounts}>
              {users =>
                users.map(u => (
                  <UserBar key={u._id} paper user={u}>
                    {!myCompany && (
                      <Button
                        variant="raised"
                        color="primary"
                        disabled={currentUser.connectionRequestsSent.includes(u._id)}
                        onClick={requestUserConnection(u._id)}
                      >
                        {currentUser.connectionRequestsSent.includes(u._id) ? 'Connect Pending' : 'Connect'}
                      </Button>
                    )}
                  </UserBar>
                ))
              }
            </FetchUsers>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(CompanyPage);
