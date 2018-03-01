import axios from 'axios';
import types from 'constants/CompanyActionTypes';
import authTypes from 'constants/AuthActionTypes';
import userTypes from 'constants/UserActionTypes';

export const getCount = _ => async dispatch => {
  try {
    const res = await axios.get('/api/company/count');
    dispatch({
      type: types.ADD_COMPANY_COUNT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const createCompany = company => async dispatch => {
  try {
    const res = await axios.post('/api/company/new', company);
    console.log(res.data);
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
    console.log('Error creating company');
    console.log(err);
  }
};

export const fetchCompany = id => async dispatch => {
  try {
    const res = await axios.get(`/api/company/${id}`);
    dispatch({
      type: types.FETCH_COMPANY,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchCompanies = params => async dispatch => {
  try {
    const res = await axios.get('/api/companies/', { params });
    dispatch({
      type: types.FETCH_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const joinCompanyRequest = companyId => async dispatch => {
  try {
    const res = await axios.post(`/api/company/join/${companyId}`);
    console.log(res.data);
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
    console.log(err);
  }
};
