import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Auth from './services/Auth';
import Routes from './Routes';
import configureStore from './redux/store';

const preloadState = {
  user: {
    currentUser: Auth.currentUser
  }
};

console.log('test');

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