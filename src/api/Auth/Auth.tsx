import * as localForage from 'localforage';
import jwtDecode from 'jwt-decode';

import {config} from '../../constants/routes';
import {UserState} from '../../store/auth/types';

class Auth {
  signIn = async (email: string, password: string) => {
    // Get token authorization
    return await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(async jwt => {
      const {uid} = jwtDecode(jwt.access);
      return await this.fetch(`users/${uid}`, {
        method: 'GET'
      }).then( resp => {
        const userData = {
          email: resp.email,
          displayName: resp.first_name,
          isActive: resp.is_active,
          isAdmin: resp.is_staff,
          jwtAccess: jwt.access,
          jwtRefresh: jwt.refresh
        };
        // Create localStorage item.
        localStorage.setItem('auth:user', JSON.stringify(userData));
        // Return user
        return userData;
      });
    });
  };

  currentUser = (): UserState  => {
    const userData = localStorage.getItem('auth:user');
    return userData ? JSON.parse(userData) : {};
  };

  signOut = () => {
    localForage.removeItem('auth:user').then(() => {
      console.log('signout...');
    });
  };

  ///////////
  // Helpers
  //////////

  fetch = async (path: string, options: object) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    return await fetch(`${config.APIDOMAIN}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    }).then(response => {
      if (response.ok) return response;
      // Raise an exception to reject the promise and trigger the outer .catch() handler.
      // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
      // for security logout user and clear user.
      localForage.removeItem('auth:user').then();
      throw new Error(response.statusText);
    }).then( response => response.json());
  };
}

export default new Auth();