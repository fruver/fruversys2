import * as React from 'react';
import {useSession} from '@fruver/react-firebase';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {LOGIN} from '../constants/routes';

interface PrivateRoute extends RouteProps {
  component?: any;
}

const PrivateRoute = ({
  component: Component,
  ...otherProps
}: PrivateRoute) => {
  const user = useSession();

  return (
    <Route
      {...otherProps}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN,
              state: {form: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;