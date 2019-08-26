import * as React from 'react';
import auth from '../Auth';

export interface RootContext {
  user?: any;
  isLoading?: boolean;
}

export const UserContext = React.createContext<RootContext>({});

export const useAuth = (accessToken: string|null) => {
  const [authState, setAuthState] = React.useState<RootContext>({
    user: undefined,
    isLoading: true
  });

  React.useEffect(() => {
    const unsubscribe = () => {
      if (accessToken) {
        auth.setToken(accessToken);
        setAuthState({
          user: auth.user(),
          isLoading: false
        })
      } else if (!accessToken) {
        // Logout
        auth.signOut()
        setAuthState({
          user: undefined,
          isLoading: false
        });
      }
    };

    return unsubscribe();

  }, [accessToken]);

  return authState;
};

export const useSession = () => {
  const {user} = React.useContext(UserContext);
  return user;
};