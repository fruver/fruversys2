import jwtDecode from 'jwt-decode';
import {DOMAIN_API} from './constants/routes';

class Auth {
  token: string|null

  constructor() {
    this.token = this.getToken();
  }

  signIn = async (email: string, password: string) => {
    try {
      const resp = await this.fetch('token-auth/', {
        method: 'POST',
        body: JSON.stringify({email, password})
      })
      return resp;
    } catch (reason) {
      throw reason;
    }
  };

  signOut = () => {
    // Remove user token from localStorage
    localStorage.removeItem('access_token');
  }

  loggedIn = () => {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token);
  }

  getToken = () => {
    // Returned user token from localStorage
    return localStorage.getItem('access_token');
  };

  isTokenExpired = (token: string) => {
    try {
      const {exp} = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch(err) {
      return false;
    }
  };

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Autorization: JWT xxxx.xxxx.xxx
    if (this.loggedIn()) {
      // @ts-ignore
      headers['Autorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}

export default new Auth;