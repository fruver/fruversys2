import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface Props extends RouteProps {
  component?: any;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: Props) => {
  con user = true;
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;