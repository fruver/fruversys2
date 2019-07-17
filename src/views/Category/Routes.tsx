import * as React from 'react';

// Routes
import * as routes from '../../constants/routes';

// Components
import PrivateRoute from '../../components/PrivateRoute';

// Views
import CategoryList from './List';

const CategoryRoute = (
  <PrivateRoute
    component={CategoryList}
    path={routes.CATEGORY_LIST}
  />
);

export default CategoryRoute;