import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {useSession} from '../hooks/useAuth';

import Auth from '../resources/Auth';

interface Props extends RouteProps {
  component?: any;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: Props) => {
  const user = false;

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location}
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;