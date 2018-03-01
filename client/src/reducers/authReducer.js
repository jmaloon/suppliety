import types from 'constants/AuthActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case types.AUTH_FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
