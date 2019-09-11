import * as React from 'react';
import {AuthContext} from './context';

export const useAuth = () => {
  const [authState, setAuthState] = React.useState<RootContext>({
    isLoading: true
  });

  // Return the user object and auth methods
  return {
    authState,
    setAuthState
  };
};