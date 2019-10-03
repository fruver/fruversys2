import * as React from 'react';
import {AUTH_ACTIONS} from '../constants/ActionTypes';

export const initialState = {
  uid: null,
  email: null,
  first_name: null,
  last_name: null,
  is_active: null,
  is_staff: null,
  is_superuser: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {...state, isLoading: true};
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {...state, isLoading: true};
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {...state};
    default:
      return state;
  }
};

export const useAuth = () => {
  const [state, dispatch] = React.useReducer(initialState, reducer);
  // Return the user object and auth methods
  return {state, dispatch};
};