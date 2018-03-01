import types from 'constants/UserActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload,
          status: { success: true }
        }
      };
    case types.FETCH_USERS:
      const newUsers = {};
      action.payload.forEach(user => (newUsers[user._id] = user));
      return {
        ...state,
        ...newUsers
      };
    default:
      return state;
  }
}
