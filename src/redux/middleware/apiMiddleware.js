import {API_ROUTES} from '../../constants/Routes';

const callApi = (endpoint, options) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return fetch(API_ROUTES.DOMAIN + endpoint, {
    cache: 'default',
    headers: headers,
    ...options
  }).then(response => {
    if (response.ok) return response;
    throw new Error(response.statusText);
  }).then(response => response.json());
};

const CALL_API = 'CALL_API';
export default store => next => action => {
  const callAPI = action(CALL_API);

  const {dispatch, getState} = store;

  if (typeof action === 'function') {
    console.log('test');
    return action(dispatch, getState);
  }

  const {type, types, payload} = action;
  const {url, method, data, onSuccess, onFailure} = payload;

  if (type !== 'API') return next(action);

  // Config Fetch.
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const init = {
    method: method,
    headers: headers,
    cache: 'default'
  };

  if (data) {
    init.append('body', JSON.stringify(data));
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  dispatch({type: REQUEST});

  const response = fetch(API_ROUTES.DOMAIN + url, {
    ...init
  }).then(response => {
    if (response.ok) return response;
    throw new Error(response.statusText);
  }).then(response => {
    return response.json();
  }).then(response => {
    // execute onSuccess
    console.log('onSuccess');
  }).catch(reason => {
    // execute onFailure
    console.log('onFailure');
  });

  return response;
  // Necesitamos poder decodificar los dos tokens
  // 1. Access: Verificar si el token es valido.
  //    si es valido procedemos con la petición.
  // 2. De lo contrario, Refresh: si el token es
  //    valido, procedemos a generar un nuevo token
  //    de Access.
  // 3. En caso contrario, deslogueamos al usuario,
  //    destruimos el store y localstorage, por ultimo
  //    solicitamos al usuario volver a iniciar sesión.
};

export default requestMiddleware;

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