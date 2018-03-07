import React, { PureComponent } from 'react';

import CompanySelect from 'components/forms/CompanySelect';
import CompanyForm from 'components/forms/CompanyForm';

import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 600px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  [theme.breakpoints.only('xs')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});
class AddCompany extends PureComponent {
  state = { create: false };

  render() {
    const { create } = this.state;
    const { classes, onCreateCompany, onAccountRequest } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography style={{ display: 'inline' }}>Create New</Typography>
          <Switch checked={create} onChange={() => this.setState({ create: !create })} color="secondary" />
          {create ? <CompanyForm onSubmit={onCreateCompany} /> : <CompanySelect onSubmit={onAccountRequest} />}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(AddCompany);
