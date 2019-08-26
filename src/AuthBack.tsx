import React, {useContext} from 'react';

import {DOMAIN_API} from './constants/routes';
import {userContext} from './context/UserContext';
import {}

export const useSession = () => {
  const {user} = useContext(userContext);
  return user;
};

interface AuthInterface {
  token: string|null;
  login(email: string, password: string): void;
  onAuthStateChanged(): void;
}

export default {
  token: string|null;

  constructor() {
    this.token = this.getToken();
  }

  login: async (email: string, password: string) => {
    try {
      await this.fetch('token-auth/', {
        body: JSON.stringify({email:email, password: password})
      }).then((resp: any) => {
        if (resp.token) {
          this.setToken(resp.token);
        }
      });
    } catch(reason) {
      throw reason;
    }
  };

  setToken = (token: string) => {
    // Save user token in localStorage
    localStorage.setItem('id_token', token);
  }

  getToken = () => {
    // Return user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout = () => {
    // Remove user token from localStorage
    localStorage.removeItem('id_token');
  }

  // Helpers

  onAuthStateChanged = (user: User) => {
    console.log('test');
    return 'user';
  }

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Autorization: JWT xxxx.xxxx.xxx
    if (this.getToken()) {
      // @ts-ignore
      headers['Autorization'] = `JWT ${this.token}`;
    }

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      method: 'POST',
      mode: 'CORS',
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}