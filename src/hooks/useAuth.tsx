import * as React from 'react';
import * as firebase from 'firebase/app';
import {User} from 'firebase/app';
import 'firebase/auth';

interface RootContext {
  user?: User;
  isLoading?: boolean;
}

export const AuthContext = React.createContext<RootContext>({});

export const useSession = () => {
  const {user} = React.useContext(AuthContext);
  return user;
};

export const useAuth = () => {
  const [authState, setAuthState] = React.useState<RootContext>({
    user: undefined,
    isLoading: true
  })

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authUser=> {
      setAuthState({
        user: authUser ? authUser : undefined,
        isLoading: false
      });
      console.log(authUser);
    });

    return unsubscribe;
  }, []);

  // Return the user object and auth methods
  return authState;
};