import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 150
  }
});

class CompanyCard extends PureComponent {
  state = {};

  render() {
    const { classes, to } = this.props;
    if (to) {
      return (
        <Link to={to}>
          <article className={classes.root}>{this.renderContent()}</article>
        </Link>
      );
    }
    return <article className={classes.root}>{this.renderContent()}</article>;
  }

  renderContent() {
    const { company } = this.props;

    return (
      <Fragment>
        <img src={company.image || companyDefault} alt="company logo" />
        <Typography variant="body2">{company.name}</Typography>
        <Typography>{company.about}</Typography>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CompanyCard);
