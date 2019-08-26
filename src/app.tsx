import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import * as firebase from 'firebase/app';

import Routes from './Routes';
import {Spinner} from './components/Spinner';
import {authContext, useAuth} from './hooks/useAuth';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
})

export const App = ()  => {
  const {user, isLoading} = useAuth(firebase.auth());

  if(isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <authContext.Provider value={{user: user, isLoading: isLoading}}>
      <div className="app">
        <Router>
          <Routes />
        </Router>
      </div>
    </authContext.Provider>
  );
};

export default App;