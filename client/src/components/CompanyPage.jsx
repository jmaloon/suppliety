import React, { PureComponent, Fragment } from 'react';
import CompanyDetails from 'components/CompanyDetails';
import FetchUsers from 'containers/FetchUsers';
import UserCard from 'components/UserCard';
import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';
// const styles = {};

class CompanyPage extends PureComponent {
  render() {
    const {
      company,
      connected,
      connectionRequested,
      myCompany,
      onCompanyConnect,
      requestCompanyConnection
    } = this.props;
    console.log(company);
    return (
      <Fragment>
        <CompanyDetails company={company} />

        {!myCompany &&
          !connected && (
            <Button
              variant="raised"
              color="secondary"
              fullWidth
              disabled={connectionRequested}
              onClick={() => requestCompanyConnection(company._id)}
            >
              {connectionRequested ? (
                'Connection Pending'
              ) : (
                <Fragment>
                  <Plus />
                  'Connect'
                </Fragment>
              )}
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
