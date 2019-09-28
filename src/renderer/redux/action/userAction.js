import {HTTP_API} from '../middleware/httpMiddleware';
import {API_ROUTES} from '../../constants/Routes';
import Auth from '../../services/Auth';

export const TOKEN_AUTH_REQUEST = 'TOKEN_AUTH_REQUEST';
export const TOKEN_AUTH_SUCCESS = 'TOKEN_AUTH_SUCCESS';
export const TOKEN_AUTH_FAILURE = 'TOKEN_AUTH_FAILURE';


// Redux-Thunk in Action!!: Handle by middleware httpMiddleware
export const login = (email, password) => ({
  [HTTP_API]: {
    endpoint: API_ROUTES.TOKEN_AUTH,
    handleResponse: (response) => {

    },
    options: {
      method: 'POST',
      body: JSON.stringify({email, password})
    },
    types: [TOKEN_AUTH_REQUEST, TOKEN_AUTH_SUCCESS, TOKEN_REVOKE_FAILURE]
  }
});

export const signIn = (email, password) => dispatch => {
  return dispatch(login(email, password));
};

export const TOKEN_REVOKE_REQUEST = 'TOKEN_REVOKE_REQUEST';
export const TOKEN_REVOKE_SUCCESS = 'TOKEN_REVOKE_SUCCESS';
export const TOKEN_REVOKE_FAILURE = 'TOKEN_REVOKE_FAILURE';

export const logout = () => dispatch => {
  dispatch({
    type: TOKEN_REVOKE_SUCCESS
  });
};

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const user = (uid) => ({
  [HTTP_API]: {
    endpoint: API_ROUTES.USERS + uid,
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE]
  }
});