import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    height: 50,
    width: 50
  },
  name: { flex: 1 }
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
    const { actions, classes, children, company } = this.props;

    return (
      <Fragment>
        <img
          src={company.image || companyDefault}
          alt="company logo"
          className={classes.image}
        />
        <Typography variant="body2" className={classes.name}>
          {company.name}
        </Typography>
        {children}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CompanyCard);
