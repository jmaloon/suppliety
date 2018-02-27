import axios from 'axios';
import types from 'constants/AuthActionTypes';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({
      type: types.FETCH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error fetching User');
    console.log(err);
  }
};
