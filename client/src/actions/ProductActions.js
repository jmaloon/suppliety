import axios from 'axios';
import types from 'constants/ProductActionTypes';
import companyTypes from 'constants/CompanyActionTypes';

export const addProduct = productData => async dispatch => {
  try {
    const res = await axios.post('/api/product/new', { productData });
    dispatch({
      type: types.ADD_PRODUCT,
      payload: res.data[0]
    });
    dispatch({
      type: companyTypes.FETCH_COMPANY,
      payload: res.data[1]
    });
  } catch (err) {
    console.log('Error Adding Product');
    console.log(err);
  }
};

export const editProduct = productData => async dispatch => {
  try {
    const res = await axios.patch(`/api/product/edit`, { productData });
    dispatch({
      type: types.ADD_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    console.log('Error Editing Product');
    console.log(err);
  }
};

export const fetchProducts = productIds => async dispatch => {
  try {
    const res = await axios.post('/api/products/fetch', { productIds });
    dispatch({
      type: types.FETCH_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.log('Error fetching products');
    console.log(err);
  }
};
