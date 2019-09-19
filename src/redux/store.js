import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import monitorReducerEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './middleware/loggerMiddleware';
import apiMiddleware from './middleware/apiMiddleware';
import rootReducer from './reducer/rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = [
    loggerMiddleware,
    apiMiddleware,
    thunkMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, preloadedState, composeEnhancers);
}
