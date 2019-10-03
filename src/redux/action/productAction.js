import Auth from '../../services/Auth';
import {AUTH_ACTIONS} from '../../constants/ActionTypes';

export const login = (email, password) => dispatch => {
  dispatch({type: AUTH_ACTIONS.LOGIN_REQUEST});
  return Auth.signIn(email, password).then((user) => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: user
    });
  }).catch(reason => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN_FAILURE,
      payload: reason
    });
  });
};

export const logout = () => dispatch => {
  // Clear localStorage
  Auth.signOut().then(() => {
    dispatch({
      type: AUTH_ACTIONS.LOGOUT_SUCCESS
    });
  }).catch(() => {
    dispatch({type: AUTH_ACTIONS.LOGOUT_FAILURE});
  });
};


export const fetchProducts = () => (dispatch, getState) => {
  const {user} = getState();

};