import React, { PureComponent } from 'react';

import Typography from 'material-ui/Typography';
import withStyles from 'theme/utils';

const styles = theme => ({});

class UserBar extends PureComponent {
  state = {};
  render() {
    const { user } = this.props;
    return <div>USER BAR</div>;
  }
}

export default withStyles(styles)(UserBar);
