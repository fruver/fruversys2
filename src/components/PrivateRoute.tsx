import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {useSession} from '@fruver/react-firebase';
// import { LOGIN } from '../constants/routes';

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
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;