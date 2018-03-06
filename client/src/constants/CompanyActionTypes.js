import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_COMPANY_COUNT',
  'CREATE_COMPANY',
  'FETCH_COMPANY',
  'FETCH_COMPANIES',
  'UPDATE_COMPANIES'
]);

export default actionTypes;
