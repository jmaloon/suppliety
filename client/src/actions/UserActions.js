import axios from 'axios';
import authTypes from 'constants/AuthActionTypes';
import types from 'constants/UserActionTypes';

export const updateUser = user => async dispatch => {
  try {
    const res = await axios.patch(`/api/user/${user._id}`, user);
    dispatch({
      type: authTypes.FETCH_USER,
      payload: res.data
    });
    dispatch({
      type: types.INSERT_USER,
      payload: res.data
    });
  } catch (err) {
    console.log('Error updating User');
    console.log(err);
  }
};

export const fetchUsers = userIds => async dispatch => {
  try {
    const res = await axios.post('api/users/', { ids: userIds });
    dispatch({
      type: types.INSERT_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
