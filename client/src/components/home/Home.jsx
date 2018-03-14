import React, { PureComponent, Fragment } from 'react';

import Tabs, { Tab } from 'material-ui/Tabs';
import ProductsHome from 'components/home/ProductsHome';
import ConnectionsCntr from 'containers/ConnectionsCntr';
import CatalogCntr from 'containers/home/CatalogCntr';
import CommunityCntr from 'containers/home/CommunityCntr';
import Visitor from 'components/home/Visitor';

export const HomeUser = class extends PureComponent {
  state = {};
  render() {
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

        {tab === 0 && <CommunityCntr />}
        {tab === 1 && <ProductsHome />}
        {tab === 2 && <ConnectionsCntr />}
      </Fragment>
    );
  }
};

export const HomeSupplier = class extends PureComponent {
  state = {};
  render() {
    const { tab = 1 } = this.state;

    return (
      <Fragment>
        <Tabs
          value={tab}
          onChange={(e, tab) => this.setState({ tab })}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          fullWidth
          scrollable
        >
          <Tab label="Community" />
          <Tab label="Catalog" />
          <Tab label="Delivery Days & Policies" />
          <Tab label="Connections" />
        </Tabs>

        {tab === 0 && <CommunityCntr />}
        {tab === 1 && <CatalogCntr />}
        {tab === 2 && <ProductsHome />}
        {tab === 3 && <ConnectionsCntr />}
      </Fragment>
    );
  }
};

export const HomeVisitor = class extends PureComponent {
  state = {};
  render() {
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
          <Tab label="Community Updates" />
          <Tab label="Products" />
          <Tab label="Connections" />
        </Tabs>

        {tab === 1 ? <ProductsHome /> : <Visitor />}
      </Fragment>
    );
  }
};
