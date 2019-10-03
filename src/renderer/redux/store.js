import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import httpMiddleware from './middleware/httpMiddleware';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import rootReducer from './reducer/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, httpMiddleware, loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers = composeWithDevTools(...enhancers);

  return createStore(
    persistReducer(persistConfig, rootReducer),
    preloadedState,
    composeEnhancers
  );
}
