import React, { PureComponent, Fragment } from 'react';
import { getUsername } from 'theme/utils';
import sortBy from 'sort-by';
import Typography from 'material-ui/Typography';
import CompanyCard from 'components/CompanyCard';

export default class Discovery extends PureComponent {
  render() {
    const { currentUser, companies } = this.props;

    return (
      <div>
        {!!currentUser ? (
          <Typography color="primary" variant="display1">{`Hello ${getUsername(
            currentUser
          )}`}</Typography>
        ) : (
          <Fragment>
            <Typography color="primary" variant="display1">
              Suppliety
            </Typography>
            <Typography variant="display1">
              Local businesses and products
            </Typography>
          </Fragment>
        )}
        <Typography>Companies</Typography>
        {companies
          .sort(sortBy('created'))
          .map(c => (
            <CompanyCard key={c._id} company={c} to={`/company/${c._id}`} />
          ))}
      </div>
    );
  }
}
