import axios from 'axios';
import types from 'constants/CompanyActionTypes';
import authTypes from 'constants/AuthActionTypes';

export const createCompany = company => async dispatch => {
  try {
    const res = await axios.post('/api/company/new', company);
    dispatch({
      type: types.INSERT_COMPANY,
      payload: res.data[0]
    });
    dispatch({
      type: authTypes.FETCH_USER,
      payload: res.data[1]
    });
  } catch (err) {
    console.log('Error creating company');
    console.log(err);
  }
};

export const fetchCompany = id => async dispatch => {
  try {
    const res = await axios.get(`/api/company/${id}`);
    dispatch({
      type: types.INSERT_COMPANY,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
