import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import {Spinner} from './components/Spinner';
import {AuthContext, useAuth} from './hooks/useAuth';

export const App = ()  => {

  const {user, isLoading} = useAuth();

  if(isLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{user, isLoading}}>
      <div className="app">
        <Router>
          <Routes />
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;