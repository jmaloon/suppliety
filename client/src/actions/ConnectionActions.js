import axios from 'axios';
import types from 'constants/CompanyActionTypes';
import authTypes from 'constants/AuthActionTypes';
import userTypes from 'constants/UserActionTypes';

export const accountRequest = companyId => async dispatch => {
  try {
    const res = await axios.post(`/api/company/accountRequest/${companyId}`);
    dispatch({
      type: types.FETCH_COMPANY,
      payload: res.data[0]
    });
    dispatch({
      type: authTypes.AUTH_FETCH_USER,
      payload: res.data[1]
    });
    dispatch({
      type: userTypes.FETCH_USER,
      payload: res.data[1]
    });
  } catch (err) {
    console.log('Error with join company request');
    console.log(err);
  }
};

export const acceptAccountRequest = joinerId => async dispatch => {
  try {
    const res = await axios.post('/api/company/acceptAccountRequest', {
      joinerId
    });
    dispatch({
      type: types.FETCH_COMPANY,
      payload: res.data[0]
    });
    dispatch({
      type: userTypes.FETCH_USER,
      payload: res.data[1]
    });
  } catch (err) {
    console.log('Error accepting account request');
    console.log(err);
  }
};

export const requestCompanyConnection = companyId => async dispatch => {
  try {
    const res = await axios.post('/api/company/requestCompanyConnection', {
      companyId
    });
    dispatch({
      type: types.UPDATE_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    console.log('Error requesting company connection');
    console.log(err);
  }
};
