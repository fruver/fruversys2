import {AUTH_ACTIONS} from '../../constants/ActionTypes';

export const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
  isLoading: false
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return initialState;
    case AUTH_ACTIONS.LOGOUT_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default reducer;