import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import {USER_ROUTES, DASH_ROUTES} from './constants/Routes';
import Home from './views/Pages/Home';
import Faq from './views/Pages/Faq';
import Login from './views/User/Login';
import Signup from './views/User/Signup';
import ProductList from './views/Catalogue/ProductList';

// Product Views
//import ProductList from './pages/ProductList';
//import ProductCreate from './pages/ProductCreate';
//import ProductUpdate from './pages/ProductUpdate';

// Brand Views
// import BrandList from './views/Brand/Table';
// import BrandCreate from './views/Brand/Create';
// import BrandUpdate from './views/Brand/Update';

const Routes = () => {
  return (
    <Switch>
      <Route component={Login} path={USER_ROUTES.SIGNIN}/>
      <Route component={Signup} path={USER_ROUTES.SIGNUP}/>
      <PrivateRoute component={Home} path={DASH_ROUTES.SUMMARY} exact/>
      <PrivateRoute component={Faq} path={DASH_ROUTES.FAQ}/>
      <PrivateRoute component={ProductList} path={DASH_ROUTES.PRODUCTS} exact/>

      {/*<PrivateRoute*/}
      {/*  component={ProductCreate}*/}
      {/*  path="/products/create"*/}
      {/*/>*/}

      {/*<PrivateRoute*/}
      {/*  component={ProductUpdate}*/}
      {/*  path='/products/:id'*/}
      {/*/>*/}

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