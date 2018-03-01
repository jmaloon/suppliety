import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_COMPANY_COUNT',
  'FETCH_COMPANY',
  'FETCH_COMPANIES'
]);

export default actionTypes;
