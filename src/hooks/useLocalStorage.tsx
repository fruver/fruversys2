import * as React from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [accessToken, setAccessToken] = React.useState(() => {
    const token = window.localStorage.getItem('access_token');
    return token ? token : null;
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Save state
      setAccessToken(value);
      // Save to local storage
      window.localStorage.setItem('access_token', JSON.stringify(value));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [accessToken, setValue];
};