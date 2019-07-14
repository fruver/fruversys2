import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSession} from '@fruver/react-firebase';
import {LOGIN} from '../constants/routes';

const PrivateRoute = ({
  component: Component,
  ...otherProps
}) => {
  const user = useSession();

  return (
    <Route
      {...otherProps}
      render={({location, props}) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN,
              state: {form: location}
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType
};

export default PrivateRoute;