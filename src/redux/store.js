import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import httpMiddleware from './middleware/httpMiddleware';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import rootReducer from './reducer/rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = [
    thunkMiddleware,
    httpMiddleware,
    loggerMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, preloadedState, composeEnhancers);
}
