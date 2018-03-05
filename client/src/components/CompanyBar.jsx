import React, { PureComponent, Fragment } from 'react';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';
import Phone from 'mdi-material-ui/Phone';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class CompanyCard extends PureComponent {
  state = {};

  render() {
    const { classes, paper } = this.props;
    if (paper) {
      return <Paper className={classes.root}>{this.renderContent()}</Paper>;
    }
    return <div className={classes.root}>{this.renderContent()}</div>;
  }

  renderContent() {
    const { company } = this.props;

    return (
      <Fragment>
        <img src={company.image || companyDefault} alt="company logo" />
        <div>
          <Typography variant="display1">{company.name}</Typography>
          {company.phone && (
            <Typography>
              <Phone />
              {company.phone}
            </Typography>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CompanyCard);
