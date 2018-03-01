import React, { PureComponent, Fragment } from 'react';
import CompanyForm from 'components/forms/CompanyForm';
import CompanySelect from 'components/forms/CompanySelect';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

const styles = {};

class UserCompanySetup extends PureComponent {
  state = { create: false };

  onSubmit = data => {
    const { create } = this.state;
    const { onUserCompanyCreate, onUserCompanySelect } = this.props;

    create ? onUserCompanyCreate(data) : onUserCompanySelect(data);
  };

  render() {
    // const { onUserCompanyCreate, onUserCompanySelect } = this.props;
    const { create } = this.state;
    return (
      <Fragment>
        <Typography style={{ display: 'inline' }}>Create New</Typography>
        <Switch
          checked={create}
          onChange={() => this.setState({ create: !create })}
          color="secondary"
        />
        {create ? (
          <CompanyForm onSubmit={this.onSubmit} />
        ) : (
          <CompanySelect onSubmit={this.onSubmit} />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(UserCompanySetup);
