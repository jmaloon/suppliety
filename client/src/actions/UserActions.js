import axios from 'axios';
import types from 'constants/AuthActionTypes';

export const updateUser = user => async dispatch => {
  try {
    const res = await axios.patch(`/api/user/${user._id}`, user);
    dispatch({
      type: types.FETCH_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error updating User');
    console.log(err);
  }
};
