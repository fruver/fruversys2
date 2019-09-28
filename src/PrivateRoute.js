import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import {useSelector} from 'react-redux';
import {ROUTES} from './constants/Routes';

const PrivateRoute = ({component: Component, ...otherProps}) => {
  const {currentUser} = useSelector(store => store.user);

  return (
    <Route {...otherProps} render={props => currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: ROUTES.SIGNIN,
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