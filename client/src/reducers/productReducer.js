import types from 'constants/ProductActionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_PRODUCT:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case types.FETCH_PRODUCTS:
      const fetchedProducts = {};
      action.payload.forEach(p => (fetchedProducts[p._id] = p));

      return {
        ...state,
        ...fetchedProducts
      };
    default:
      return state;
  }
}
