import React, { Fragment, PureComponent } from 'react';
import Typography from 'material-ui/Typography';
import FetchUsers from 'containers/FetchUsers';
import FetchCompanies from 'containers/FetchCompanies';
import UserCard from 'components/UserCard';
import CompanyCard from 'components/CompanyCard';

export default class ConnectionsHome extends PureComponent {
  render() {
    const { currentUser } = this.props;

    return (
      <Fragment>
        {currentUser.admin && (
          <Fragment>
            <Typography variant="display1">Company Connections</Typography>
            <FetchCompanies companyIds={[currentUser.company]}>
              {userCompany => (
                <FetchCompanies companyIds={userCompany[0].connections}>
                  {companies =>
                    companies.map(company => (
                      <CompanyCard key={company._id} paper company={company} />
                    ))
                  }
                </FetchCompanies>
              )}
            </FetchCompanies>
          </Fragment>
        )}
        <Typography variant="display1">Connections</Typography>
        <FetchUsers userIds={currentUser.connections}>
          {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
        </FetchUsers>

        <Typography variant="display1">Requests Sent</Typography>
        <FetchUsers userIds={currentUser.connectionRequestsSent}>
          {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
        </FetchUsers>

        <Typography variant="display1">Requests Received</Typography>
        <FetchUsers userIds={currentUser.connectionRequestsReceived}>
          {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
        </FetchUsers>
      </Fragment>
    );
    //
    // const connections = currentUser
    //   ? currentUser.connections
    //   : company.connections;
    // const sent = currentUser
    //   ? currentUser.connectionRequestsSent
    //   : company.connectionRequestsSent;
    // const received = currentUser
    //   ? currentUser.connectionRequestsReceived
    //   : company.connectionRequestsReceived;
    //
    // return (
    //   <Fragment>
    //     <Typography variant="display1">All Connections</Typography>
    //     <FetchUsers userIds={connections}>
    //       {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
    //     </FetchUsers>
    //
    //     <Typography variant="display1">Requests Sent</Typography>
    //     <FetchUsers userIds={sent}>
    //       {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
    //     </FetchUsers>
    //
    //     <Typography variant="display1">Requests Received</Typography>
    //     <FetchUsers userIds={received}>
    //       {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
    //     </FetchUsers>
    //   </Fragment>
    // );
  }
}
