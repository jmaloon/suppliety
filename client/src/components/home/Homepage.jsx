import React, { PureComponent, Fragment } from 'react';

import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import CompanyHome from 'components/home/CompanyHome';
import ProductsHome from 'components/home/ProductsHome';
import ConnectionsCntr from 'containers/ConnectionsCntr';

export const HomepageCompany = class extends PureComponent {
  state = {};
  render() {
    const { currentUser } = this.props;
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

        {tab === 0 && <CompanyHome currentUser={currentUser} />}
        {tab === 1 && <ProductsHome currentUser={currentUser} />}
        {tab === 2 && <ConnectionsCntr />}
      </Fragment>
    );
  }
};

export const HomepageVisitor = () => (
  <Fragment>
    <Typography variant="display1">Welcome</Typography>
  </Fragment>
);
