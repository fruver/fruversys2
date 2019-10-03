import {ROUTES} from '../../constants/Routes';
import {HTTP_API} from '../middleware/httpMiddleware';

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FAILURE = 'CATEGORY_FAILURE';

export const fetchDepartaments = () => {
  return {
    [HTTP_API]: {
      endpoint: ROUTES.CATEGORY,
      options: {
        method: 'GET',
        requireToken: true 
      },
      types: [CATEGORY_REQUEST, CATEGORY_REQUEST, CATEGORY_FAILURE]
    }
  };
};