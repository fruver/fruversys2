import * as React from 'react';
import {Switch, Route} from 'react-router-dom';

// Routes
import * as routes from './constants/routes';
// Components
import PrivateRoute from './components/PrivateRoute';
// Views Basic
import Login from './views/User/Login';
import Summary from './views/Dashboard/Summary';
// Product Views
import ProductList from './views/Product/List';
import ProductCreate from './views/Product/Create';
// import ProductUpdate from './views/Product/Update';
// Brand Views
// import BrandList from './views/Brand/Table';
// import BrandCreate from './views/Brand/Create';
// import BrandUpdate from './views/Brand/Update';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute component={Summary} path={routes.SUMMARY} exact/>
      <Route component={Login} path={routes.LOGIN} />

      {/* Product Views */}
      <PrivateRoute
        component={ProductList}
        path='/products'
        exact
      />
      <PrivateRoute
        component={ProductCreate}
        path='/products/create'
      />
      
      {/* <PrivateRoute
        component={ProductUpdate}
        path='/products/:id'
      /> */}

      {/* Brand Views */}
      {/* <PrivateRoute
        component={BrandList}
        path='/brands'
        exact
      />
      <PrivateRoute
        component={BrandCreate}
        path='/brands/create'
      />
      <PrivateRoute
        component={BrandUpdate}
        path='/brands/update'
      /> */}
    </Switch>
  );
};

export default Routes;