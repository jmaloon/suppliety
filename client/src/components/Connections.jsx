import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import FetchUsers from 'containers/FetchUsers';
import FetchCompanies from 'containers/FetchCompanies';
import UserCard from 'components/UserCard';
import CompanyCard from 'components/CompanyCard';
import Button from 'material-ui/Button';

export default class ConnectionsHome extends PureComponent {
  render() {
    const { currentUser, acceptAccountRequest, acceptCompanyRequest } = this.props;

    return (
      <Fragment>
        {currentUser.admin && (
          <FetchCompanies companyIds={[currentUser.company]}>
            {userCompany => (
              <Fragment>
                <Typography variant="display1">Company Connections</Typography>
                <FetchCompanies companyIds={userCompany[0].connections}>
                  {companies =>
                    companies.map(company => (
                      <CompanyCard key={company._id} company={company}>
                        <Link to={`/company/${company._id}`}>
                          <Button>
                            <Typography variant="button">View</Typography>
                          </Button>
                        </Link>
                      </CompanyCard>
                    ))
                  }
                </FetchCompanies>
                {!!userCompany[0].connectionRequestsSent.length && (
                  <Fragment>
                    <Typography variant="display1">Company Connections Sent</Typography>
                    <FetchCompanies companyIds={userCompany[0].connectionRequestsSent}>
                      {companies =>
                        companies.map(company => (
                          <CompanyCard key={company._id} company={company}>
                            <Button disabled>Pending</Button>
                          </CompanyCard>
                        ))
                      }
                    </FetchCompanies>
                  </Fragment>
                )}
                {!!userCompany[0].connectionRequestsReceived.length && (
                  <Fragment>
                    <Typography variant="display1">Company Connections Received</Typography>
                    <FetchCompanies companyIds={userCompany[0].connectionRequestsReceived}>
                      {companies =>
                        companies.map(company => (
                          <CompanyCard key={company._id} company={company}>
                            <Button onClick={acceptCompanyRequest(company._id)}>Accept</Button>
                          </CompanyCard>
                        ))
                      }
                    </FetchCompanies>
                  </Fragment>
                )}
                {!!userCompany[0].accountRequests.length && (
                  <Fragment>
                    <Typography variant="display1">Company Account Requests</Typography>
                    <FetchCompanies companyIds={userCompany[0].accountRequests}>
                      {users =>
                        users.map(u => (
                          <UserCard key={u._id} user={u}>
                            <Button onClick={acceptAccountRequest(u._id)}>Accept</Button>
                          </UserCard>
                        ))
                      }
                    </FetchCompanies>
                  </Fragment>
                )}
              </Fragment>
            )}
          </FetchCompanies>
        )}
        <Typography variant="display1">Connections</Typography>
        <FetchUsers userIds={currentUser.connections}>
          {users => users.map(u => <UserCard key={u._id} user={u} />)}
        </FetchUsers>

        {!!currentUser.connectionRequestsSent.length && (
          <Fragment>
            <Typography variant="display1">Requests Sent</Typography>
            <FetchUsers userIds={currentUser.connectionRequestsSent}>
              {users => users.map(u => <UserCard key={u._id} user={u} />)}
            </FetchUsers>
          </Fragment>
        )}

        {!!currentUser.connectionRequestsReceived.length && (
          <Fragment>
            <Typography variant="display1">Requests Received</Typography>
            <FetchUsers userIds={currentUser.connectionRequestsReceived}>
              {users => users.map(u => <UserCard key={u._id} user={u} />)}
            </FetchUsers>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
