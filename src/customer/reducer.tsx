import {RootContext} from './context';
import {AUTH_USER} from '../constants/ActionTypes';

export const reducer = (state: RootContext, action: any): RootContext => {
  switch(action.type) {
    case AUTH_USER.LOGIN_REQUEST:
      return {...state, isLoading: true};
    case AUTH_USER.LOGIN_SUCCESS:
      return {...state, isLoading: false};
    case AUTH_USER.LOGIN_FAILURE:
      return {...state};
    default:
      return state;
  }
};