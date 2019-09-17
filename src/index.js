import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);