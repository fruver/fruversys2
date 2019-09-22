import {
  TOKEN_AUTH_REQUEST,
  TOKEN_AUTH_SUCCESS,
  TOKEN_AUTH_FAILURE,
  TOKEN_REVOKE_REQUEST,
  TOKEN_REVOKE_SUCCESS,
  TOKEN_REVOKE_FAILURE
} from '../action/userAction';

export const initialState = {
  currentUser: null,
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
        currentUser: action.payload
      };
    case TOKEN_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        error: action.payload
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
        currentUser: null
      };
    case TOKEN_REVOKE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;