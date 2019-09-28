import {
  TOKEN_AUTH_REQUEST,
  TOKEN_AUTH_SUCCESS,
  TOKEN_AUTH_FAILURE,
  TOKEN_REVOKE_REQUEST,
  TOKEN_REVOKE_SUCCESS,
  TOKEN_REVOKE_FAILURE,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE
} from '../action/userAction';

export const initialState = {
  currentUser: undefined,
  token: undefined,
  error: null,
  isLoading: false
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case TOKEN_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case TOKEN_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.response
      };
    case TOKEN_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case TOKEN_REVOKE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case TOKEN_REVOKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: undefined
      };
    case TOKEN_REVOKE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        currentUser: action.response,
        isLoading: false,
      };
    case USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;