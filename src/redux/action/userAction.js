import Auth from '../../services/Auth';
import {API_ROUTES} from '../../constants/Routes';
import {
  TOKEN_AUTH_REQUEST, TOKEN_AUTH_SUCCESS, TOKEN_AUTH_FAILURE,
  TOKEN_REVOKE_SUCCESS
} from '../../constants/ActionTypes';

export const login = (email, password) => ({
  type: 'API',
  types: [TOKEN_AUTH_REQUEST, TOKEN_AUTH_SUCCESS, TOKEN_AUTH_FAILURE],
  payload: {
    url: API_ROUTES.TOKEN_AUTH,
    method: 'POST',
    data: {email, password},
    onSuccess: () => console.log('onSuccess'),
    onFailure: () => console.log('onFailure')
  }
});


export const logout = () => dispatch => {
  // Clear localStorage
  dispatch({type: TOKEN_REVOKE_SUCCESS});
};