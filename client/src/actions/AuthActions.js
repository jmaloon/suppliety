import axios from 'axios';
import types from 'constants/AuthActionTypes';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({
      type: types.AUTH_FETCH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error fetching User');
    console.log(err);
  }
};

export const loginUser = ({ username }) => async dispatch => {
  try {
    const res = await axios.post('/auth/local', { username, password: 'pass' });
    console.log(res);
    dispatch({
      type: types.AUTH_FETCH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error logging in');
    console.log(err);
  }
};

// export const signupUser = data => async dispatch => {
//   try {
//     const res = await axios.post('/auth/local/signup', data);
//     console.log(res);
//     dispatch({
//       type: types.AUTH_SIGNUP,
//       payload: res.data
//     });
//   } catch (err) {
//     console.log('Error signing up user');
//     console.log(err);
//   }
// };

export const logout = () => async dispatch => {
  try {
    const res = await axios.get('/api/logout');
    dispatch({
      type: types.AUTH_FETCH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error logging out');
    console.log(err);
  }
};
