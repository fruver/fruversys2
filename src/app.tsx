import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {UserContext} from './context/user';
import {useAuth} from './hooks/useAuth';
import {Spinner} from './components/Spinner';
import Routes from './Routes';


//import Auth from './Auth';
// cada ves que se actualice la app
// se genera un nuevo id de esta variable
// por lo tanto debe volver a verificar
// el use
//const auth = new Auth;

export const App = ()  => {
  const {user, isLoading} = useAuth(localStorage.getItem('jwt_access'));

  if(isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <UserContext.Provider value={{user: user, isLoading: isLoading}}>
      <div className="app">
        <Router>
          <Routes />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;