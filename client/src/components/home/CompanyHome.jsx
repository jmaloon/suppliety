import React, { PureComponent, Fragment } from 'react';
import FetchCompany from 'containers/FetchCompany';
import FetchUsers from 'containers/FetchUsers';
import CompanyCard from 'components/CompanyCard';
import UserCard from 'components/UserCard';

export default class CompanyHome extends PureComponent {
  render() {
    const { auth } = this.props;
    return (
      <FetchCompany companyId={auth.company}>
        {c => (
          <Fragment>
            <CompanyCard company={c} />
            <FetchUsers userIds={c.accounts}>
              {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
            </FetchUsers>
          </Fragment>
        )}
      </FetchCompany>
    );
  }
}
