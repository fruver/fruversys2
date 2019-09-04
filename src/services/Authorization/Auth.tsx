import jwtDecode from 'jwt-decode';
import {DOMAIN_API} from '../../constants/routes';
import AuthorDB, {Author} from './db';

class Auth  {
  db: AuthorDB;

  constructor() {
    this.db = new AuthorDB();
  }

  public signIn = async (email: string, password: string) => {
    // Get token authorization
    const response: any = await this.fetchSignIn(email, password);
    // Get user info
    // const user = await this.fetchUser(auth.userId);

    // Clear tables if exists
    await this._clearAll();

    // Store Authorization.
    const tokenManager = await this.db.tokenManager.b(auth);

    // test
    console.log(tokenManager);
    // console.log(tokenRefresh);
  };

  public signOut = async () => {
    // Clear database if exists
    return await this._clearAll();
  };

  ///////////
  // Helpers
  //////////

  _clearAll = () => {
    return this.db.tokenManager.clear();
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
    // 6. Una ves que el token "refresh" ha caducado se cerrara la sesión


    return this.db.tokenManager.toCollection().first().then( (item: Author|undefined) => {
      const tokenAccessExpiredAt = item ? (item.exp * 1000) : NaN;
      if (new Date().getTime() < tokenAccessExpiredAt) {
        // renovar el access token, si el refresh token es valido.
        return true;
      }



      return new Date().getTime() < expiredAt;
    });
  };


  // _isAuthenticated = async () => {
  //   // const expiresAt = await this.currentAuth ? this.currentAuth.exp * 1000 : null;
  //   const currentAuth = await this._currentAuth();
  //
  //   if (currentAuth) {
  //     const expiresAt = currentAuth.exp * 1000;
  //     return new Date().getTime() < expiresAt;
  //   } else {
  //     return false;
  //   }
  // };

  // _accesstoken = () => {
  //   const token = localForage.item
  // }

  //////////////
  // Properties
  /////////////

  // get isAuthenticated() {return this._isAuthenticated();}

  ///////////
  // Fetches
  //////////

  fetchUser = async (userId: number) => {
    return await this.fetch(`users/${userId}`, {
      'method': 'GET'
    }).then(user => {
      return user;
    }).catch(error => {
      throw error;
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

  fetchSignIn = async (email: string, password: string) => {
    return await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(resp => {
      // Build Data for TokenAccess.
      const tokenAccess = {token: resp.access, ...jwtDecode(resp.access)};
      const tokenRefresh = {token: resp.refresh, ...jwtDecode(resp.refresh)};
      return [tokenAccess, tokenRefresh];
    });
  };

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    //if(this.isAuthenticated()) {
    //   headers['Autorization'] =
    //}

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}

export default new Auth();