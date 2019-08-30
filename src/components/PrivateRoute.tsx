import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {useSession} from '../hooks/useAuth';

interface Props extends RouteProps {
  component?: any;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: Props) => {
  const user = useSession();

  return (
    <Route
      {...rest}
      render={props =>
        user && user.isAnonymous ? (
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