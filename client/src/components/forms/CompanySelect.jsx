import React, { PureComponent, Fragment } from 'react';
import FetchCompanies from 'containers/FetchCompanies';
import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Loader from 'components/my-elements/Loader';

export default class CompanySelect extends PureComponent {
  state = { skip: 0, limit: 4 };
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { selected } = this.state;

    onSubmit(selected);
  };

  render() {
    const { skip, limit, selected } = this.state;

    return (
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
                        onClick={() => this.setState({ selected: company._id })}
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
        <Button disabled={!selected} onClick={this.onSubmit}>
          Done
        </Button>
      </Fragment>
    );
  }
}
