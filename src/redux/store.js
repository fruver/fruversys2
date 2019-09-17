import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import monitorReducerEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './middlewares/logger';
import rootReducer from './reducers/rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composeEnhancers);

  return store;
}