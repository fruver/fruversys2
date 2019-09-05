import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import {DOMAIN_API} from '../../constants/routes';

export interface Author {
  token: string;
  refresh: string;
  uid: number;
  exp: number;
  jti: string;
}

export const signIn = async (email: string, password: string) => {
  // Get token authorization
  await this.fetchTokenAuth(email, password).then(resp => {
    window.localStorage.setItem('auth', JSON.stringify(resp));
    this._subject().next(resp);
  });
};

export const signOut = () => {

}

class Auth  {

  signIn = async (email: string, password: string) => {
    // Get token authorization
    await this.fetchTokenAuth(email, password).then(resp => {
      window.localStorage.setItem('auth', JSON.stringify(resp));
      this._subject().next(resp);
    });
  };

  signOut = async () => {
    // Clear database if exists
    window.localStorage.removeItem('auth');
  };

  ///////////
  // Helpers
  //////////

  onAuthStateChanged = () => {
    // observable
    return this._subject().asObservable();
  };

  isAuthenticated = () => {
    // 1. Cuando inicie sesión, recibiremos 2 tokens (access/refresh).
    // 2. Alamecenar los datos en Dexie (base de datos del navegador).
    // 3. El token "access" tendra una validez menor al del token "refresh".
    //    El token "access" se usara para llamar a las api, pero cuando caduque,
    //    eliga el token "refresh" para llamar a la api de authorization
    //    para obtener un nuevo token "access".
    // 4. Antes de llamar a cualquier API con el token access, debera existir
    //    un handle para verificar que el token es valido, de lo contrario.
    // 5. El servidor de authorization tendrá una API que aceptara el token "refresh"
    //    y verificara su validez y devolvera un token nuevo de accesso.
    // 6. Una ves que el token "refresh" ha caducado se cerrara la sesión.
    const authorItem = window.localStorage.getItem('auth');

    if (authorItem) {
      const expiredAt = JSON.parse(authorItem).exp * 1000;
      return new Date().getTime() < expiredAt;
    } else {
      return false;
    }
  };

  ///////////
  // Private
  //////////

  _getAll = (): Author|null => {
    const authorItem = window.localStorage.getItem('auth');
    if (authorItem) return JSON.parse(authorItem);
    return null;
  };

  _subject = () => {
    return new BehaviorSubject(this._getAll());
  }

  //////////////
  // Properties
  /////////////

  ///////////
  // Fetches
  //////////

  fetchTokenAuth = async (email: string, password: string) => {
    return await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(resp => {
      // Build Data for TokenAccess.
      return {
        token: resp.access,
        refresh: resp.refresh,
        ...jwtDecode(resp.access)
      };
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

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}

export default new Auth();