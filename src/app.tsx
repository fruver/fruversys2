import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import {Spinner} from './components/Spinner';
import {authContext, useProvideAuth} from './hooks/useAuth';

import Auth from './Auth';

export const App = ()  => {
  const {user, setValue} = useProvideAuth(Auth);

  // if(isLoading) {
  //   return (
  //     <Spinner />
  //   );
  // }

  return (
    <authContext.Provider value={{user, setValue}}>
      <div className="app">
        <Router>
          <Routes />
        </Router>
      </div>
    </authContext.Provider>
  );
};

export default App;