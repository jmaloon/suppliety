import axios from 'axios';
import types from 'constants/CompanyActionTypes';
import authTypes from 'constants/AuthActionTypes';

export const createCompany = company => async dispatch => {
  try {
    const res = await axios.post('/api/company/new', company);
    // console.log(res);
    dispatch({
      type: types.CREATE_COMPANY,
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
