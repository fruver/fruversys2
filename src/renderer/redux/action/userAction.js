import {HTTP_API} from '../middleware/httpMiddleware';
import {API_ROUTES} from '../../constants/Routes';

export const TOKEN_AUTH_REQUEST = 'TOKEN_AUTH_REQUEST';
export const TOKEN_AUTH_SUCCESS = 'TOKEN_AUTH_SUCCESS';
export const TOKEN_AUTH_FAILURE = 'TOKEN_AUTH_FAILURE';


// Redux-Thunk in Action!!: Handle by middleware httpMiddleware
export const fetchToken = (email, password) => ({
  [HTTP_API]: {
    endpoint: API_ROUTES.TOKEN_AUTH,
    options: {
      method: 'POST',
      body: JSON.stringify({email, password})
    },
    types: [TOKEN_AUTH_REQUEST, TOKEN_AUTH_SUCCESS, TOKEN_REVOKE_FAILURE]
  }
});

export const TOKEN_REVOKE_SUCCESS = 'TOKEN_REVOKE_SUCCESS';
export const TOKEN_REVOKE_FAILURE = 'TOKEN_REVOKE_FAILURE';

export const logout = () => ({
  type: TOKEN_REVOKE_SUCCESS
});