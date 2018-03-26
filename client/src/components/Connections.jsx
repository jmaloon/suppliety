import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";
import Typography from "material-ui/Typography";
import FetchUsers from "containers/FetchUsers";
import FetchCompanies from "containers/FetchCompanies";
import FetchCompany from "containers/FetchCompany";
import UserCard from "components/UserCard";
import UserBar from "components/UserBar";
import CompanyCard from "components/CompanyCard";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Eye from "mdi-material-ui/Eye";

import { withStyles } from "theme/utils";

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "auto 960px auto",
    gridTemplateRows: "auto",
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: "content",
    padding: 20
    // '& a': {
    //   textDecoration: 'none'
    // }
  },
  [theme.breakpoints.down("sm")]: {
    container: {
      gridTemplateColumns: "auto",
      gridTemplateAreas: "'content'"
    }
  },
  flex: {
    display: 'flex',
  }
});

class Connections extends PureComponent {
  render() {
    const {
      classes,
      currentUser,
      acceptAccountRequest,
      acceptCompanyRequest,
      requestUserConnection,
      acceptUserConnection
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          {currentUser.admin && (
            <FetchCompanies companyIds={[currentUser.company]}>
              {userCompany => (
                <Fragment>
                  <Typography variant="display1">
                    Company Connections
                  </Typography>
                  <FetchCompanies companyIds={userCompany[0].connections}>
                    {companies =>
                      companies.map(company => (
                        <CompanyCard key={company._id} company={company}>
                          <Link to={`/company/${company._id}`}>
                            <IconButton>
                              <Eye />
                            </IconButton>
                          </Link>
                        </CompanyCard>
                      ))
                    }
                  </FetchCompanies>
                  {!!userCompany[0].connectionRequestsSent.length && (
                    <Fragment>
                      <Typography variant="display1">
                        Company Connections Sent
                      </Typography>
                      <FetchCompanies
                        companyIds={userCompany[0].connectionRequestsSent}
                      >
                        {companies =>
                          companies.map(company => (
                            <CompanyCard key={company._id} company={company}>
                              <Button variant="raised" color="primary" disabled>
                                Pending
                              </Button>
                            </CompanyCard>
                          ))
                        }
                      </FetchCompanies>
                    </Fragment>
                  )}
                  {!!userCompany[0].connectionRequestsReceived.length && (
                    <Fragment>
                      <Typography variant="display1">
                        Company Connections Received
                      </Typography>
                      <FetchCompanies
                        companyIds={userCompany[0].connectionRequestsReceived}
                      >
                        {companies =>
                          companies.map(company => (
                            <CompanyCard key={company._id} company={company}>
                              <Button
                                variant="raised"
                                color="primary"
                                onClick={acceptCompanyRequest(company._id)}
                              >
                                Accept
                              </Button>
                            </CompanyCard>
                          ))
                        }
                      </FetchCompanies>
                    </Fragment>
                  )}
                  {!!userCompany[0].accountRequests.length && (
                    <Fragment>
                      <Typography variant="display1">
                        Company Account Requests
                      </Typography>
                      <div className={classes.flex}>
                        <FetchUsers userIds={userCompany[0].accountRequests}>
                          {users =>
                            users.map(u => (
                              <UserCard key={u._id} user={u}>
                                <Button color='primary' variant='raised' onClick={acceptAccountRequest(u._id)}>Accept</Button>
                              </UserCard>
                            ))
                          }
                        </FetchUsers>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </FetchCompanies>
          )}
          {!currentUser.companyAccepted && currentUser.company && (
            <FetchCompany companyId={currentUser.company}>{company => (
              <CompanyCard company={company}>
                <Button
                  variant="raised"
                  color="primary"
                  disabled
                >
                  Join Requested
                </Button>
              </CompanyCard>
            )}</FetchCompany>
          )}
          <Typography variant="display1">Connections</Typography>
          <FetchUsers userIds={currentUser.connections}>
            {users =>
              users.map(u => (
                <UserBar
                  key={u._id}
                  paper
                  user={u}
                  currentUser={currentUser}
                  myCompany={false}
                  acceptUserConnection={acceptUserConnection}
                  requestUserConnection={requestUserConnection}
                />
              ))
            }
          </FetchUsers>

          {!!currentUser.connectionRequestsSent.length && (
            <Fragment>
              <Typography variant="display1">Requests Sent</Typography>
              <FetchUsers userIds={currentUser.connectionRequestsSent}>
                {users =>
                  users.map(u => (
                    <UserBar
                      key={u._id}
                      paper
                      user={u}
                      currentUser={currentUser}
                      myCompany={false}
                      acceptUserConnection={acceptUserConnection}
                      requestUserConnection={requestUserConnection}
                    />
                  ))
                }
              </FetchUsers>
            </Fragment>
          )}

          {!!currentUser.connectionRequestsReceived.length && (
            <Fragment>
              <Typography variant="display1">Requests Received</Typography>
              <FetchUsers userIds={currentUser.connectionRequestsReceived}>
                {users =>
                  users.map(u => (
                    <UserBar
                      key={u._id}
                      paper
                      user={u}
                      currentUser={currentUser}
                      myCompany={false}
                      acceptUserConnection={acceptUserConnection}
                      requestUserConnection={requestUserConnection}
                    />
                  ))
                }
              </FetchUsers>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Connections);
