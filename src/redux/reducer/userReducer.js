import {USER_ACTION} from '../../constants/ActionTypes';

export const initialState = {
  currentUser: null,
  error: null,
  isLoading: false
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case USER_ACTION.USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_ACTION.USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case USER_ACTION.USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;