import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from 'reducers/authReducer';
import companyReducer from 'reducers/companyReducer';
import userReducer from 'reducers/userReducer';
import productReducer from 'reducers/productReducer';

const reducer = combineReducers({
  auth: authReducer,
  companies: companyReducer,
  users: userReducer,
  products: productReducer
});

export default createStore(reducer, {}, applyMiddleware(reduxThunk));
