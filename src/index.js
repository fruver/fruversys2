import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MemoryRouter as Router} from 'react-router';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import Auth from './services/Auth';
import Routes from './Routes';
import configureStore from './redux/store';

const preloadState = {
  user: {
    currentUser: Auth.currentUser
  }
};

const store = configureStore(preloadState);
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);