import * as React from 'react';
import * as firebase from 'firebase/app';
import {User} from 'firebase';
import 'firebase/auth';

interface RootContext {
  user?: firebase.User;
  isLoading?: boolean;
}

export const authContext = React.createContext<RootContext>({});

export const useSession = () => {
  const {user} = React.useContext(authContext)
  return user;
};

export const useAuth = (auth: any) => {
  const [authState, setAuthState] = React.useState<RootContext>({
    user: undefined,
    isLoading: true
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User) => {
      setAuthState({
        user: user,
        isLoading: false
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Return the user object and auth methods
  return authState;
};