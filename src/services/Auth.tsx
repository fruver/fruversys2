import * as localForage from 'localforage';
import jwtDecode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import {config} from '../constants/routes';
import jwtDecode from "./Auth/Back2Auth";

export interface Token {
  uid: number;
  exp: number;
  token: string;
  jti?: string;
  token_type?: string;
}

class Auth {
  signIn = async (email: string, password: string) => {
    const auth = await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(resp => {
      // store user details and jwt token in local storage
      // to keep user logged in between page refreshes.
      const tokenAccess = this.decodeToken(resp.access);
      const tokenRefresh = this.decodeToken(resp.refresh);

      localForage.setItem('token:access', tokenAccess).then(() => {
        return localForage.setItem('token:refresh', tokenRefresh);
      });

      this._currentUserSubject.next(resp);
      return resp;
    });
  };

  createUser = () => {

  };

  signOut = () => {

  };

  currentUser = () => this._currentUserSubject.value;

  onAuthStateChanged = () => this._currentUserSubject.asObservable();

  isAuthenticated = () => {
    return false;
  };

  //////////
  // Helpers
  //////////

  _currentUser = (): string|null => {
    const item = window.localStorage.getItem('auth');
    if (item) return JSON.parse(item);
    return null;
  };

  _currentUserSubject = new BehaviorSubject(this._currentUser());

  decodeToken = (token: string): Token => {
    // return: Token
    const decodeToken: Token = jwtDecode(token);

    // Delete unnecessary fields
    delete decodeToken['token_type'];
    delete decodeToken['jti'];

    return {token: token, ...decodeToken};
  };

  //////////
  // Fetchs
  /////////

  fetchTokenAuth = async (email: string, password: string) => {
    return await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(resp => {
      // Build Data for TokenAccess.
      return this.decodeToken(resp);
    });
  };

  fetchTokenRefresh = async (token: string) => {
    return await this.fetch('token-refresh/', {
      'method': 'POST',
      'body': JSON.stringify({'refresh': token})
    }).then( resp => {
      // return new accessToken.
      return resp;
    });
  };

  fetchUser = async (userId: number) => {
    return await this.fetch(`users/${userId}`, {
      'method': 'GET'
    }).then(user => {
      return user;
    }).catch(error => {
      throw error;
    });
  };

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    return await fetch(`${config.APIDOMAIN}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    }).then(resp => resp.json());
  };
}

export default new Auth();