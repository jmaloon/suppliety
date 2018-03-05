import React, { PureComponent, Fragment } from 'react';
import CompanyDetails from 'components/CompanyDetails';
import FetchUsers from 'containers/FetchUsers';
import UserCard from 'components/UserCard';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > section': {
      display: 'flex',
      width: '100%'
    }
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  info: {
    display: 'flex',
    alignItems: 'center'
  }
});

class CompanyPage extends PureComponent {
  render() {
    const { classes, company, connected } = this.props;
    return (
      <Fragment>
        <CompanyDetails company={company} />

        <Button variant="raised" color="secondary" fullWidth>
          + Connect
        </Button>
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
