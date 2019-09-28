import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
} from '../action/categoryAction';

export const initialState = {
  data: [],
  error: undefined,
  isLoading: false
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case CATEGORY_FAILURE:
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