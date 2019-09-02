import * as React from 'react';
import Auth from '../resources/Auth';

interface RootContext {
  user?: any;
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
  });

  React.useEffect(() => {
    const subscribe = Auth.onAuthStateChanged.subscribe((user: any) => {
      setAuthState({
        user: user ? user : undefined,
        isLoading: false
      });
      console.log(`hook ${user}`);
    });

    return function cleanup() {
      subscribe.unsubscribe();
    };
  }, []);

  // Return the user object and auth methods
  return authState;
};