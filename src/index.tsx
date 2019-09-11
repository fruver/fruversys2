import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import {AuthContext} from './customer/context';
import Routes from './Routes';

const App = () => {
  return (
    <AuthContext.Provider value={{}}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);