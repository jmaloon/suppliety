import React from 'react';
import CompanyForm from 'components/forms/CompanyForm';
import { withStyles } from 'theme/utils';

const styles = {};
// switch to select company or create one
export default withStyles(styles)(props => (
  <div>
    <CompanyForm {...props} />
  </div>
));
