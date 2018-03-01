import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from 'reducers/authReducer';
import companyReducer from 'reducers/companyReducer';
import userReducer from 'reducers/userReducer';

const reducer = combineReducers({
  auth: authReducer,
  companies: companyReducer,
  users: userReducer
});

export default createStore(reducer, {}, applyMiddleware(reduxThunk));
