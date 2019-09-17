import localForage from 'localforage';
import jwtDecode from 'jwt-decode';

import {API_ROUTES} from '../constants/Routes';

class Auth {
  signIn = async (email, password) => {
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
    // const data = {...user, authToken};

    // localForage es una promesa mas por lo tanto
    // la vamos a resolver por fuera de cualquier otra promesa.
    const storage = localForage.setItem('auth:user', {
      ...user,
      ...jwt
    }).then(() => {
      return localForage.getItem('auth:user');
    });

    // Retornamos el storage para que pueda ser usado
    // luego como una promesa.
    return storage;
  };

  signOut = () => {
    // Eliminamos cualquier información persistente.
    // Debemos eliminar tambien de la store de redux.
    return localForage.removeItem('auth:user');
  };

  ///////////
  // Helpers
  //////////

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
      localStorage.removeItem('auth:user');
      throw new Error(response.statusText);
    }).then( response => response.json());
  };
}

export default new Auth();