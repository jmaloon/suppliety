import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getUsername } from 'theme/utils';
import sortBy from 'sort-by';
import Typography from 'material-ui/Typography';
// import CompanyCard from 'components/CompanyCard';
import GridList from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import TileItem from 'components/my-elements/TileItem';
import Eye from 'mdi-material-ui/Eye';
import { withStyles } from 'theme/utils';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 960px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'. content .'"
  },
  content: {
    gridArea: 'content',
    padding: 20
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  },
  gridList: {
    flexWrap: 'nowrap'
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)'
  }
});

class Discovery extends PureComponent {
  render() {
    const { classes, currentUser, companies } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          {!!currentUser ? (
            <Typography
              color="primary"
              variant="display1"
            >{`Hello ${getUsername(currentUser)}`}</Typography>
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
          {/* {companies
            .sort(sortBy('created'))
            .map(c => (
            <CompanyCard key={c._id} company={c} to={`/company/${c._id}`} />
          ))} */}
          <GridList className={classes.gridList} cols={2.5}>
            {companies.sort(sortBy('created')).map(c => (
              <TileItem
                key={c._id}
                type="company"
                title={c.name}
                subtitle={c.about}
                image={c.image}
                action={
                  <Link to={`/company/${c._id}`}>
                    <IconButton>
                      <Eye />
                    </IconButton>
                  </Link>
                }
              />
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Discovery);
