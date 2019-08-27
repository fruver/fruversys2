import * as React from 'react';
import jwtDecode from 'jwt-decode';

interface RootContext {
  user?: any;
  setValue?: any;
}

export const authContext = React.createContext<RootContext>({});

export const useAuth = () => {
  return React.useContext(authContext);
};

export const useProvideAuth = () => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [accessToken, setAccessToken] = React.useState(() => {
    const token = window.localStorage.getItem('access_token');
    return token ? token : null;
  });

  const [user, setUser] = React.useState(false);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string) => {
    try {
      // Save state
      setAccessToken(value);
      // Save to local storage
      window.localStorage.setItem('access_token', JSON.stringify(value));
      // Save state user
      setUser(true);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
      setUser(false);
    }
  };

  React.useEffect(() => {
    console.log('test');
    window.addEventListener('storage', (event) => {
      const token = window.localStorage.getItem('access_token');
      alert('token');
    });
  }, []);

  // Return the user object and auth methods
  return {
    user,
    setValue
  };
};