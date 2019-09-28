import {ROUTES} from '../../constants/Routes';
import {HTTP_API} from '../middleware/httpMiddleware';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAILURE = 'CATEGORY_FAILURE';

export const getAllCategory = () => dispatch => {
  return {
    HTTP_API: {
      types: [CATEGORY_REQUEST, CATEGORY_REQUEST, CATEGORY_FAILURE],
      endpoint: ROUTES.CATEGORY,
      options: null
    }
  };
};

export const categories = () => dispatch => {
  dispatch({type: CATEGORY_REQUEST});
  return API.Category().then(response => {
    dispatch({
      type: CATEGORY_SUCCESS,
      payload: response
    });
  }).catch(reason => {
    dispatch({
      type: CATEGORY_FAILURE,
      payload: reason.message
    });
  });
};