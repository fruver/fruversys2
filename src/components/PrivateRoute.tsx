import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from '@fruver/react-firebase';
import { LOGIN } from '../constants/routes';

interface PrivateRouteProps extends RouteProps {
  component?: any;
}

const PrivateRoute = ({
  component: Component,
  ...otherProps
}: PrivateRouteProps) => {
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
              state: { form: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;