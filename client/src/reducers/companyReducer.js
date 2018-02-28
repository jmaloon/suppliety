import types from 'constants/CompanyActionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case types.CREATE_COMPANY:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    default:
      return state;
  }
}
