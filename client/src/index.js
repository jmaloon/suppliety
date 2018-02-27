import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from 'containers/MainLayout';
import { MuiThemeProvider } from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

import Reboot from 'material-ui/Reboot';
import theme from 'theme/theme';
import 'typeface-roboto';

ReactDOM.render(
  <div>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <MainLayout />
    </MuiThemeProvider>
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
