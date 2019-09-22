import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import API from './services/API';
import Routes from './Routes';
import configureStore from './redux/store';

const preloadState = {
  user: {
    currentUser: API.loadState()
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