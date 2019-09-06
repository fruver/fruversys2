import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
// import {Auth} from '../services';

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