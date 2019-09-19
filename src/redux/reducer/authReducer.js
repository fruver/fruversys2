import {USER_ACTION} from '../../constants/ActionTypes';
import {initialState} from './userReducer';

export const initialState = {
  jwt: null,
  error: null,
  isLoading: false
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case USER_ACTION.TOKEN_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_ACTION.TOKEN_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload
      };
    case USER_ACTION.TOKEN_AUTH_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case USER_ACTION.TOKEN_REVOKE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_ACTION.TOKEN_REVOKE_SUCCESS:
      return {
        ...state,
        jwt: null,
        isLoading: false
      };
    case USER_ACTION.TOKEN_REVOKE_FAILURE:
      return state;
    default:
      return state;
  }
};

export default reducer;