import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {ROUTES} from './constants/Routes';
import PrivateRoute from './PrivateRoute';
import Home from './views/Pages/Home';
import Faq from './views/Pages/Faq';
import Login from './views/User/Login';
import Signup from './views/User/Signup';
import ProductList from './views/Catalogue/ProductList';
import CategoryList from './views/Catalogue/CategoryList';

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
      <Route component={Login} path={ROUTES.SIGNIN}/>
      <Route component={Signup} path={ROUTES.SIGNUP}/>

      <PrivateRoute component={Home} path={ROUTES.SUMMARY} exact/>
      <PrivateRoute component={Faq} path={ROUTES.FAQ}/>

      <PrivateRoute component={ProductList} path={ROUTES.PRODUCTS} exact/>
      <PrivateRoute component={CategoryList} path={ROUTES.CATEGORY} exact/>>

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