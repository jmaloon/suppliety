import axios from 'axios';
import types from 'constants/ProductActionTypes';

// export const fetchUser = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/current_user');
//     dispatch({
//       type: types.AUTH_FETCH_USER,
//       payload: res.data
//     });
//   } catch (err) {
//     console.log('Error fetching User');
//     console.log(err);
//   }
// };

export const addProduct = productData => async dispatch => {
  try {
    const res = await axios.post('/api/product/new', { productData });
    // console.log(productData);
    console.log(res);
  } catch (err) {
    console.log('Error Adding Product');
    console.log(err);
  }
};
