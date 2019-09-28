import {BASKET_ACTIONS} from '../../constants/ActionTypes';

export const initalState = {
  uid: false,
  items: [],
};

const reducer = (state=initalState, action) => {
  switch (action.type) {
    case BASKET_ACTIONS.ADD:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;