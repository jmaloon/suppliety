// import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'react-redux';
import mainStore from 'store/mainStore';

import MainLayout from 'containers/MainLayout';
import Reboot from 'material-ui/Reboot';
import theme from 'theme/theme';
import 'typeface-roboto';

ReactDOM.render(
  <Provider store={mainStore}>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <MainLayout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
