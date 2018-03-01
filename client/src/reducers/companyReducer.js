import types from 'constants/CompanyActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case types.INSERT_COMPANY:
      return {
        ...state,
        [action.payload._id]: {
          ...action.payload,
          status: true
        }
      };
    default:
      return state;
  }
}
