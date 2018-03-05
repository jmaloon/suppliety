import withStyles from 'material-ui/styles/withStyles';
const getUsername = user => {
  return user ? user.nameFirst || '' : '';
};
export { withStyles, getUsername };
