import {camelizeKeys} from 'humps';

import {API_ROUTES} from '../../constants/Routes';

// Action key that carries API call info interpreted by this Redux middleware.
export const HTTP_API = 'HTTP_API';

const http = (endpoint, options) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if(options && options.headers) {
    headers = {...headers, ...options.headers};
  }

  return fetch(
    API_ROUTES.DOMAIN + endpoint, {
      method: 'GET',
      cache: 'default',
      headers: headers,
      ...options
    }
  ).then(response => {
    if(response.ok) return response;
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }).then(response => response.json()).then(response => {
    return camelizeKeys(response);
  });
};

export default store => next => action => {
  const httpOpts = action[HTTP_API];

  if(typeof httpOpts === 'undefined') {
    return next(action);
  }

  const {
    endpoint,
    handleResponse,
    types,
    options
  } = httpOpts;

  if(typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if(types.every(type => typeof type !== 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if(typeof handleResponse !== 'undefined') {
    if(typeof handleResponse !== 'function') {
      throw new Error('Handle response must be a function');
    }
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[HTTP_API];
    return finalAction;
  };

  const [REQUEST, SUCCESS, FAILURE] = types;

  // Start call http api
  next(actionWith({
    type: REQUEST
  }));

  // Pasemos el token si existe y si es valido.
  // Necesitamos saber si el token es valido.


  return http(endpoint, options).then(response => {
    return next(actionWith({
      response: handleResponse !== 'undefined' ? handleResponse(response): response,
      type: SUCCESS
    }));
  }).catch(error => {
    return next(actionWith({
      error: error.message || 'Something bad happened',
      type: FAILURE
    }));
  });
};


// if (currentUser && tokenAccess) {
//   const isTokenAccessExpired = Auth.isTokenExpired(tokenAccess);
//   const isTokenRefreshExpired = Auth.isTokenExpired(tokenRefresh);
//   if (isTokenAccessExpired && !isTokenRefreshExpired) {
//     // Actualizamos el tokenAccess
//     const request = Auth.TokenRefresh(tokenRefresh).then(token => {
//       return next({
//         type:
//       })
//     });
//     console.log('token required refresh');
//   } else if (isTokenRefreshExpired) {
//     // Logout and Redirect to Login page.
//     console.log('tokenRefresh is expired');
//   } else {
//     // pass, tokenAccess is valid.
//     console.log('tokenAccess is valid');
//   }
// }