import API from '../../services/API';

export const TOKEN_AUTH_REQUEST = 'TOKEN_AUTH_REQUEST';
export const TOKEN_AUTH_SUCCESS = 'TOKEN_AUTH_SUCCESS';
export const TOKEN_AUTH_FAILURE = 'TOKEN_AUTH_FAILURE';

export const login = (email, password) => dispatch => {
  dispatch({type: TOKEN_AUTH_REQUEST});
  return API.TokenAuth(email, password).then(user => {
    dispatch({
      type: TOKEN_AUTH_SUCCESS,
      payload: user
    });
  }).catch(reason => {
    dispatch({
      type: TOKEN_AUTH_FAILURE,
      payload: reason.message
    });
  });
};

export const TOKEN_REVOKE_REQUEST = 'TOKEN_REVOKE_REQUEST';
export const TOKEN_REVOKE_SUCCESS = 'TOKEN_REVOKE_SUCCESS';
export const TOKEN_REVOKE_FAILURE = 'TOKEN_REVOKE_FAILURE';

export const logout = () => dispatch => {
  dispatch({type: TOKEN_REVOKE_REQUEST});

  API.TokenRevoke().then(() => {
    dispatch({type: TOKEN_REVOKE_SUCCESS});
  }).catch(reason => {
    dispatch({
      type: TOKEN_AUTH_FAILURE,
      payload: reason
    });
  });
};