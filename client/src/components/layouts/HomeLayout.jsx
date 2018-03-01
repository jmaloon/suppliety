import React, { Component } from 'react';

import Homepage from 'components/home/Homepage';
import UserSetup from 'components/home/UserSetup';
import UserCompanySetup from 'components/home/UserCompanySetup';
// import Typography from 'material-ui/Typography';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 960px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});

class HomeLayout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>{this.getContent()}</div>
      </div>
    );
  }

  getContent() {
    const {
      auth,
      onUserSubmit,
      onUserCompanyCreate,
      onUserCompanySelect
    } = this.props;
    const common = { auth };
    if (!auth) return <Homepage {...common} />;
    return !auth.edited ? (
      <UserSetup {...common} onSubmit={onUserSubmit} />
    ) : !auth.company ? (
      <UserCompanySetup
        {...common}
        onUserCompanyCreate={onUserCompanyCreate}
        onUserCompanySelect={onUserCompanySelect}
      />
    ) : (
      <Homepage {...common} />
    );
  }
}

export default withStyles(styles)(HomeLayout);
