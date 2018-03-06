import React, { PureComponent, Fragment } from 'react';
import CompanyDetails from 'components/CompanyDetails';
import FetchUsers from 'containers/FetchUsers';
import UserCard from 'components/UserCard';
import Button from 'material-ui/Button';

// const styles = {};

class CompanyPage extends PureComponent {
  render() {
    const { company, connected, myCompany, onCompanyConnect } = this.props;
    return (
      <Fragment>
        <CompanyDetails company={company} />

        {!myCompany && (
          <Button variant="raised" color="secondary" fullWidth>
            + Connect
          </Button>
        )}
        {connected && (
          <FetchUsers userIds={company.accounts}>
            {users => users.map(u => <UserCard key={u._id} paper user={u} />)}
          </FetchUsers>
        )}
      </Fragment>
    );
  }
}
export default CompanyPage;
