import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from 'reducers/authReducer';
import companyReducer from 'reducers/companyReducer';

const reducer = combineReducers({
  auth: authReducer,
  companies: companyReducer
});

export default createStore(reducer, {}, applyMiddleware(reduxThunk));
