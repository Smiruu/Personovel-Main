// rootReducer.js
import { combineReducers } from 'redux';
import profileReducer from './profileReducers';

const rootReducer = combineReducers({
  userLogin: profileReducer,
  // Add other reducers here if needed
});

export default rootReducer;
