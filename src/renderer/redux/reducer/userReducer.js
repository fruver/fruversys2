import {
  TOKEN_AUTH_REQUEST,
  TOKEN_AUTH_SUCCESS,
  TOKEN_AUTH_FAILURE,
  TOKEN_REVOKE_SUCCESS,
  TOKEN_REVOKE_FAILURE

} from '../action/userAction';

export const initialState = {
  currentUser: undefined,
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
        currentUser: action.response
      };
    case TOKEN_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
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
    default:
      return state;
  }
};

export default reducer;