import React, { PureComponent, Fragment } from 'react';

import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import CompanyHome from 'components/home/CompanyHome';
import ProductsHome from 'components/home/ProductsHome';
import ConnectionsHome from 'components/home/ConnectionsHome';
import { withStyles } from 'theme/utils';

const styles = theme => ({});

export const HomepageCompany = class extends PureComponent {
  state = {};
  render() {
    const { auth } = this.props;
    const { tab = 0 } = this.state;

    return (
      <Fragment>
        <Tabs
          value={tab}
          onChange={(e, tab) => this.setState({ tab })}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          fullWidth
        >
          <Tab label="Company" />
          <Tab label="Products" />
          <Tab label="Connections" />
        </Tabs>

        {tab === 0 && <CompanyHome auth={auth} />}
        {tab === 1 && <ProductsHome auth={auth} />}
        {tab === 2 && <ConnectionsHome auth={auth} />}
      </Fragment>
    );
  }
};

export const HomepageVisitor = withStyles(styles)(({ auth }) => (
  <Fragment>
    <Typography variant="display1">Welcome</Typography>
  </Fragment>
));
