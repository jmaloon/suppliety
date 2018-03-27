import React, { PureComponent, Fragment } from 'react';
import CompanyDetails from 'components/CompanyDetails';
import FetchUsers from 'containers/FetchUsers';
import FetchProducts from 'containers/FetchProducts';
import ProductCard from 'components/ProductCard';
import UserBar from 'components/UserBar';
import Button from 'material-ui/Button';
import Plus from 'mdi-material-ui/Plus';
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
  products: {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row wrap'
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      gridTemplateColumns: 'auto',
      gridTemplateAreas: "'content'"
    }
  }
});

class CompanyPage extends PureComponent {
  // state = { expanded: [] };
  //
  // toggleUser = id => () => {
  //   const { expanded } = this.state;
  //   if (expanded.includes(id)) return this.setState({ expanded: expanded.filter(e => e !== id) });
  //   return this.setState({ expanded: [...expanded, id] });
  // };

  render() {
    const {
      classes,
      company,
      connected,
      connectionRequestReceived,
      connectionRequestSent,
      currentUser,
      myCompany,
      requestCompanyConnection,
      acceptCompanyRequest,
      acceptUserConnection,
      requestUserConnection
    } = this.props;
    // const { expanded } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.content}>
          <CompanyDetails company={company} />
          {!currentUser && (
            <Button disabled={true} variant="raised" color="primary" fullWidth>
              {`Login to Connect with ${company.name}`}
            </Button>
          )}
          {!!currentUser &&
            !myCompany &&
            !connected && (
              <Button
                variant="raised"
                color="secondary"
                fullWidth
                disabled={connectionRequestSent && !connectionRequestReceived}
                onClick={connectionRequestReceived ? 
                  acceptCompanyRequest(company._id) :
                  requestCompanyConnection(company._id)
                }
              >
                {connectionRequestReceived ? 
                  'Accept' :
                  connectionRequestSent ?
                  'Connection Pending' : (
                  <Fragment>
                    <Plus /> Connect
                  </Fragment>
                )}
              </Button>
            )}
          {(connected || myCompany) && (
            <FetchUsers userIds={company.accounts}>
              {users =>
                users.map(u => (
                  <UserBar
                    key={u._id}
                    paper
                    user={u}
                    currentUser={currentUser}
                    myCompany={myCompany}
                    acceptUserConnection={acceptUserConnection}
                    requestUserConnection={requestUserConnection}
                  />
                ))
              }
            </FetchUsers>
          )}
          {company.type === "Supplier" && (<div className={classes.products}>
            <FetchProducts productIds={company.products}>
              {products => products.map(product => <ProductCard key={product._id} product={product} />)}
            </FetchProducts>
          </div>)}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(CompanyPage);
