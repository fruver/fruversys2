import {combineReducers} from 'redux';
import authReducer from './authReducer';
import basketReducer from './basketReducer';

const rootReducer = combineReducers({
  user: authReducer,
  basket: basketReducer
});

export default rootReducer;