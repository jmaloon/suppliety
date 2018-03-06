import withStyles from 'material-ui/styles/withStyles';
const getUsername = user => (user ? user.nameFirst || '' : '');

const userHasCompany = user => !!user && !!user.company && user.companyAccepted;

export { withStyles, getUsername, userHasCompany };
