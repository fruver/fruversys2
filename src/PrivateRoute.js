import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import {useSelector} from 'react-redux';
import {USER_ROUTES} from './constants/Routes';

const PrivateRoute = ({component: Component, ...otherProps}) => {
  const {isAuthenticated} = useSelector(store => store.user);

  return (
    <Route {...otherProps} render={props => isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: USER_ROUTES.SIGNIN,
          state: {from: props.location}
        }}
      />
    )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node
  ]),
  location: PropTypes.object
};

export default PrivateRoute;