import withStyles from 'material-ui/styles/withStyles';
import companyDefault from 'assets/images/company-default.svg';
import userDefault from 'assets/images/user-default.svg';
import productDefault from 'assets/images/user-default.svg';

const getUsername = user => (user ? user.nameFirst || '' : '');

const userHasCompany = user => !!user && !!user.company && user.companyAccepted;

const getCompanyImage = company => company.image || companyDefault;
const getUserImage = user => user.image || userDefault;
const getProductImage = image => image || productDefault;

export { withStyles, getUsername, userHasCompany, getCompanyImage, getUserImage, getProductImage };
