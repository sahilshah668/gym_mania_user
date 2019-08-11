import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import gymReducer from './gymReducer';
import postReducer from './postReducer'


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  gym:gymReducer,
  post:postReducer
});
