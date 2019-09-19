import {combineReducers} from 'redux';
import userReducer from './userReducer';
import basketReducer from './basketReducer';

const rootReducer = combineReducers({
  user: userReducer,
  basket: basketReducer
});

export default rootReducer;