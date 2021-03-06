import React, { PureComponent, Fragment } from 'react';
import FetchCompany from 'containers/FetchCompany';
import FetchUsers from 'containers/FetchUsers';
import CompanyDetails from 'components/CompanyDetails';
import UserCard from 'components/UserCard';

export default class CompanyHome extends PureComponent {
  render() {
    const { currentUser } = this.props;
    return (
      <FetchCompany companyId={currentUser.company}>
        {c => (
          <Fragment>
            <CompanyDetails company={c} />
            <FetchUsers userIds={c.accounts}>
              {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
            </FetchUsers>
          </Fragment>
        )}
      </FetchCompany>
    );
  }
}
