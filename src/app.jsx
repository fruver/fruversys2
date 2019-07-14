import * as React from 'react';
import firebase from 'firebase/app';
import {useAuthState, userContext} from '@fruver/react-firebase';

// Routes
import Routes from './Routes';
// Config
import FirebaseConfig from './constants/firebase';
// Material UI theme
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
// Components
import {Spinner} from './components/Spinner';

// Firebase Init
firebase.initializeApp(FirebaseConfig);

export const App = ()  => {
  const {isLoading, user} = useAuthState(firebase.auth());

  if(isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <userContext.Provider value={{user: user, isLoading: isLoading}}>
      <div className="app">
        <Routes />
      </div>
    </userContext.Provider>
  );
};

export default App;