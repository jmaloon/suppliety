import React, { PureComponent } from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class CompanyPaper extends PureComponent {
  state = {};
  render() {
    const { classes, company } = this.props;

    return (
      <Paper className={classes.root}>
        <img src={company.image || companyDefault} alt="company logo" />
        <div>
          <Typography variant="display1">{company.name}</Typography>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(CompanyPaper);
