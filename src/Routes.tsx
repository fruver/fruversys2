import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Pages Basic
import Login from './pages/Login';
import Summary from './pages/Summary';

// Product Views
import ProductList from './pages/ProductList';
import ProductCreate from './pages/ProductCreate';
import ProductUpdate from './pages/ProductUpdate';

// Brand Views
// import BrandList from './views/Brand/Table';
// import BrandCreate from './views/Brand/Create';
// import BrandUpdate from './views/Brand/Update';

const Routes = () => {
  return (
    <Switch>
      <Route
        component={Summary} 
        path="/"
        exact
      />
      
      <Route
        component={Login}
        path="/login"
      />

      {/* PRODUCTS */}
      <PrivateRoute
        component={ProductList}
        path="/products"
        exact
      />

      <PrivateRoute
        component={ProductCreate}
        path="/products/create"
      />

      <PrivateRoute
        component={ProductUpdate}
        path='/products/:id'
      />

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