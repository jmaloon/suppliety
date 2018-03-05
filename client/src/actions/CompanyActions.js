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
    console.log('Error getting company count');
    console.log(err);
  }
};

export const createCompany = company => async dispatch => {
  try {
    const res = await axios.post('/api/company/new', company);
    dispatch({
      type: types.CREATE_COMPANY,
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
    console.log('Error fetching company');
    console.log(err);
  }
};

export const fetchCompanies = companyIds => async dispatch => {
  try {
    const res = await axios.post('api/companies/', { ids: companyIds });
    dispatch({
      type: types.FETCH_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    console.log('Error fetching companies');
    console.log(err);
  }
};

export const loadCompanies = params => async dispatch => {
  try {
    const res = await axios.get('/api/companies/', { params });
    dispatch({
      type: types.FETCH_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    console.log('Error loading companies');
    console.log(err);
  }
};

export const joinCompanyRequest = companyId => async dispatch => {
  try {
    const res = await axios.post(`/api/company/join/${companyId}`);
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
