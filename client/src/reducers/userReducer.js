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
      const fetchedUsers = {};
      action.payload.forEach(user => (fetchedUsers[user._id] = user));
      return {
        ...state,
        ...fetchedUsers
      };
    default:
      return state;
  }
}
