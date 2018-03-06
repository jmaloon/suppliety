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
  // getActionButton(user) {
  //   const { currentUser, myCompany, requestUserConnection, acceptUserConnection } = this.props;
  //   if (myCompany) return null;
  //   //if connected, you can remove
  //   if (currentUser.connections.includes(user._id)) {
  //     return (
  //       <Button variant="raised" color="secondary">
  //         Remove
  //       </Button>
  //     );
  //   }
  //   //if they have requested, you can accept
  //   if (currentUser.connectionRequestsReceived.includes(user._id)) {
  //     return (
  //       <Button variant="raised" color="primary" onClick={acceptUserConnection(user._id)}>
  //         Accept
  //       </Button>
  //     );
  //   }
  //   //if you have requested, it is disabled and pending
  //   if (currentUser.connectionRequestsSent.includes(user._id)) {
  //     return (
  //       <Button variant="raised" color="primary" disabled={true}>
  //         Pending
  //       </Button>
  //     );
  //   }
  //   //if there is no status, you can request connection
  //   return (
  //     <Button variant="raised" color="primary" onClick={requestUserConnection(user._id)}>
  //       Connect
  //     </Button>
  //   );
  // }

  render() {
    const {
      classes,
      company,
      connected,
      connectionRequested,
      currentUser,
      myCompany,
      requestCompanyConnection,
      acceptUserConnection,
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
                  <UserBar
                    key={u._id}
                    paper
                    user={u}
                    currentUser={currentUser}
                    myCompany={myCompany}
                    acceptUserConnection={acceptUserConnection}
                    requestUserConnection={requestUserConnection}
                  />
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
