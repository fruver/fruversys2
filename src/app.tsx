import * as React from 'react';
import {Route} from 'react-router-dom';
import firebase from 'firebase/app';
import {useAuthState, userContext} from '@fruver/react-firebase';

// Components
import PrivateRoute from './components/PrivateRoute';

// Views
import Dashboard from './views/Dashboard';
import {Login} from './views/User';

// Config
import * as Routes from './constants/routes';
import FirebaseConfig from './constants/firebase';

// Material UI theme
import {ThemeProvider} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import theme from './theme';

// FontAwesome Spinner Icon
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import {faStroopwafel} from '@fortawesome/pro-regular-svg-icons';


// Firebase Init
firebase.initializeApp(FirebaseConfig);

export const App = ()  => {
  const {isLoading, user} = useAuthState(firebase.auth());

  if(isLoading) {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
      >
        <Icon icon={faStroopwafel} size="4x" spin />
      </Grid>
    );
  }

  return (
    <userContext.Provider value={{user: user, isLoading: isLoading}}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <PrivateRoute exact path={Routes.HOME} component={Dashboard} />
          {/* <PrivateRoute exact path="/catalogue" component={Catalogue} /> */}
          <Route exact path={Routes.LOGIN} component={Login} />
        </div>
      </ThemeProvider>
    </userContext.Provider>
  );
};

export default App;