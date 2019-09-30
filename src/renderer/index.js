import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MemoryRouter as Router} from 'react-router';

import Auth from './services/Auth';
import Routes from './Routes';
import configureStore from './redux/store';

const preloadState = {
  user: {
    currentUser: Auth.currentUser
  }
};

const store = configureStore(preloadState);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);