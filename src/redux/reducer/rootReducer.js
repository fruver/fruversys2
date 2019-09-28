import {combineReducers} from 'redux';
import userReducer from './userReducer';
import basketReducer from './basketReducer';

// Catalogue Reducers
// import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  user: userReducer,
  basket: basketReducer
});

export default rootReducer;