import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

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
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;