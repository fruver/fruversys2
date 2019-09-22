import jwtDecode from 'jwt-decode';
import {API_ROUTES} from '../constants/Routes';

class API {
  TokenAuth = async (email, password) => {
    // Get token authorization
    const jwt = await this.fetch(API_ROUTES.TOKEN_AUTH, {
      method: 'POST',
      body: JSON.stringify({email, password})
    });

    // extraemos el uid del token para consultar al usuario.
    const {uid} = jwtDecode(jwt.access);

    // Resolvemos el fetch del usuario.
    const user = await this.fetch(
      API_ROUTES.USERS + uid,
      {
        method: 'GET',
        headers: {'Authorization': `Bearer ${jwt.access}`}
      }
    );

    // Empaquetamos la información del usuario y del token
    // para pasarlo al storage.
    const data = {...user, ...jwt};

    // Guardamos la data en localStorage
    this.saveState(data);

    // Debemos retornar un objecto serializado
    // de lo que guardamos en localStorage
    return this.loadState();
  };

  TokenRefresh = async (refresh) => {
    return this.fetch(API_ROUTES.TOKEN_REFRESH, {
      method: 'POST',
      body: JSON.stringify({refresh})
    });
  };

  TokenRevoke = () => {
    // Eliminamos cualquier información persistente.
    // Debemos eliminar tambien de la store de redux.
    return new Promise((resolve, reject) => {
      this.rmState()
      resolve('success');
    });
  };

  User = async (uid) => {
    return await this.fetch(
      API_ROUTES.USERS + uid,
      {
        method: 'GET',
        headers: {'Authorization': `Bearer ${jwt.access}`}
      }
    ).then(result => {
      // Guardamos el result en localStorage
      this.saveState(result);
      return result;
    });
  };

  ///////////
  // Helpers
  //////////

  saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('auth', serializedState);
    } catch (e) {
      // ignore write errors
      console.log('save state error', e);
    }
  };

  loadState = () => {
    try {
      const serializedState = localStorage.getItem('auth');
      if(serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };

  rmState = () => {
    try {
      localStorage.removeItem('auth');
    } catch (e) {
      // ignore write errors
      console.log(e);
    }
  };

  isTokenExpired = (token) => {
    try {
      const tokenDecode = jwtDecode(token);
      const {exp: expiredAt} = tokenDecode.exp * 1000;
      return new Date().getTime() >= expiredAt;
    } catch(reason) {
      return true;
    }
  };

  fetch = async (path, options) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if(options.headers) {
      headers = {...headers, ...options.headers};
    }

    return await fetch(API_ROUTES.DOMAIN + path, {
      cache: 'default',
      headers: headers,
      ...options
    }).then(response => {
      if (response.ok) return response;
      // Raise an exception to reject the promise and trigger the outer .catch() handler.
      // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
      // for security logout user and clear user.
      this.rmState();
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }).then( response => response.json());
  };
}

export default new API();