import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

import companyDefault from 'assets/images/company-default.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: [[5, 0]],
    padding: 5
    // boxShadow: [[0, 0, 10, 0, theme.palette.grey[300]]],
    // '&:hover': {
    //   boxShadow: [[0, 0, 10, 2, theme.palette.grey[400]]]
    // }
  },
  image: {
    height: 50,
    width: 50
  },
  flex: { flex: 1 }
});

class CompanyCard extends PureComponent {
  state = {};

  render() {
    const { classes, children, company } = this.props;

    return (
      <article className={classes.root}>
        <Link to={`/company/${company._id}`}>
          <img src={company.image || companyDefault} alt="company logo" className={classes.image} />
        </Link>
        <Typography variant="body2" className={classes.flex}>
          {company.name}
        </Typography>
        {children}
      </article>
    );
  }
}

export default withStyles(styles)(CompanyCard);
