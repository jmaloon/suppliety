import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppBar from 'containers/AppBar';
import HomeCntr from 'containers/HomeCntr';

class MainLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar />
          <Route path="/" exact component={HomeCntr} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainLayout;
