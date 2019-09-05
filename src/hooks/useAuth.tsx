import * as React from 'react';
import {Auth} from '../services';

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
    const subscribe = Auth.currentUser.subscribe((user: any) => {
      setAuthState({
        user: user ? user : undefined,
        isLoading: false
      });
      console.log(`hook ${JSON.stringify(user)}`);
    });

    return function cleanup() {
      subscribe.unsubscribe();
    };
  }, []);

  // Return the user object and auth methods
  return authState;
};