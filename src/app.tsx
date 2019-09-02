import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
// import {Spinner} from './components/Spinner';
// import {AuthContext, useAuth} from './hooks/useAuth';

export const App = ()  => {

  return (
    <div className="app">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;