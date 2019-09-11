import * as React from 'react';

import {AUTH_USER} from '../constants/ActionTypes';
import {reducer} from './reducer';
import {initialState} from './context';
import { Auth } from 'api';

export const useAuth = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log(state);
  console.log(dispatch);

  const login = async (email: string, password: string) => {
    // Start request
    dispatch({type: AUTH_USER.LOGIN_REQUEST});
  
    return await Auth.signIn(email, password).then( user => {
      dispatch({type: AUTH_USER.LOGIN_SUCCESS});
      return user;
    }).catch(reason => {
      console.log('error request');
      dispatch({type: AUTH_USER.LOGIN_FAILURE, reason});
    });
  
  };

  // Return the user object and auth methods
  return {
    state,
    dispatch,
    login
  };
};