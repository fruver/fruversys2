import * as React from 'react';
import firebase from 'firebase/app';
import {useAuthState, userContext} from '@fruver/react-firebase';

import {Spinner} from './components/Spinner';
import FirebaseConfig from './constants/firebase';
import Routes from './Routes';

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