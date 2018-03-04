import React, { Fragment, PureComponent } from 'react';
// import Typography from 'material-ui/Typography';
// import FetchUsers from 'containers/FetchUsers';
// import UserCard from 'components/UserCard';

export default class ConnectionsHome extends PureComponent {
  render() {
    // const { auth, company } = this.props;
    return (
      <Fragment>
        {/* <Typography variant="display1">All Connections</Typography>
        <FetchUsers userIds={auth.connections}>
          {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
        </FetchUsers> */}

        {/* <Typography variant="display1">Company Requests</Typography>
        <FetchUsers userIds={company.connectionRequestsSent}>
          {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
        </FetchUsers> */}
      </Fragment>
    );
  }
}
