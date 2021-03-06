import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {ROUTES} from './constants/Routes';
import PrivateRoute from './PrivateRoute';
import Home from './views/Home';
import Faq from './views/Faq';
import Login from './views/user/Login';
import UserList from './views/user/UserList';

import {
  DepartamentList,
  DepartamentForm,
  ProductList
} from './views/catalogue';

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
      <PrivateRoute component={Home} path={ROUTES.SUMMARY} exact/>
      <PrivateRoute component={Faq} path={ROUTES.FAQ}/>

      <PrivateRoute component={UserList} path={ROUTES.USER} exact/>

      <PrivateRoute component={ProductList} path={ROUTES.PRODUCTS} exact/>

      <PrivateRoute component={DepartamentList} path={ROUTES.DEPARTAMENTS} exact/>
      <PrivateRoute component={DepartamentForm} path={`${ROUTES.DEPARTAMENTS}/:id`} exact/>
      <PrivateRoute component={DepartamentForm} path={`${ROUTES.DEPARTAMENTS}/create`} exact/>

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