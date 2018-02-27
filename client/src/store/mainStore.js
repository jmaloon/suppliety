import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from 'reducers/authReducer';

const reducer = combineReducers({
  auth: authReducer
});

export default createStore(reducer, {}, applyMiddleware(reduxThunk));
