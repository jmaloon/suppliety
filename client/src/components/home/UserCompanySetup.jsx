import React, { PureComponent, Fragment } from 'react';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import CompanyForm from 'components/forms/CompanyForm';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import FetchCompanies from 'containers/FetchCompanies';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import Loader from 'components/my-elements/Loader';

import { withStyles } from 'theme/utils';

const styles = {};

class UserCompanySetup extends PureComponent {
  state = { create: false, skip: 0, limit: 4 };

  render() {
    const { onSubmit } = this.props;
    const { create, skip, limit, selected } = this.state;
    return (
      <Fragment>
        <Typography style={{ display: 'inline' }}>Create New</Typography>
        <Switch
          checked={this.state.checkedA}
          onChange={() => this.setState({ create: !create })}
          color="secondary"
        />
        {create ? (
          <CompanyForm onSubmit={onSubmit} />
        ) : (
          <Fragment>
            <Typography variant="title">Select a company to join</Typography>
            <FetchCompanies params={{ limit, skip }}>
              {(companies, loading, complete) => (
                <Fragment>
                  <List>
                    {companies.map(company => (
                      <ListItem
                        key={company._id}
                        button
                        onClick={() => this.setState({ selected: company._id })}
                      >
                        <ListItemText
                          primary={company.name}
                          secondary={company.country}
                        />
                        <ListItemSecondaryAction>
                          <Checkbox
                            checked={selected === company._id}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {!complete && (
                      <ListItem
                        button
                        onClick={() => this.setState({ skip: limit + skip })}
                      >
                        <ListItemText primary="Load more..." />
                      </ListItem>
                    )}
                  </List>
                  {loading && <Loader />}
                </Fragment>
              )}
            </FetchCompanies>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(UserCompanySetup);
