import jwtDecode from 'jwt-decode';
import {DOMAIN_API} from './constants/routes';

class Auth {

  signIn = async (email: string, password: string) => {
    const path = `users/?email=${email}`;
    await this.fetch(path, {method: 'GET'}).then(resp => {
      if (resp[0].email !== email) {
        throw new Error('auth/user-not-found');
      }
    }).then(() => {
      // Try signin in backend
      return this.fetch('token-auth/', {
        method: 'POST',
        body: JSON.stringify({email, password})
      }).then(resp => {
        // setToken
        if (resp.access) {
          this.setToken(resp.access);
        } else {
          throw new Error('auth/user-credentials');
        }
      });
    });
  };

  signOut = () => {
    // Remove user token from localStorage
    localStorage.removeItem('jwt_access');
  }

  loggedIn = () => {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token);
  }

  user = () => {
    // Return an user object if token is valid
    // if (this.getToken)
    // return jwtDecode(this.getToken() || und) || null;
    return {'id': 1};
  }

  setToken = (token: string) => {
    // Save user token in localStorage
    localStorage.setItem('jwt_access', token);
  };

  getToken = () => {
    // Returned user token from localStorage
    return localStorage.getItem('jwt_access');
  };

  isTokenExpired = (token: string) => {
    try {
      const {exp} = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch(err) {
      return false;
    }
  };

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Autorization: JWT xxxx.xxxx.xxx
    if (this.loggedIn()) {
      // @ts-ignore
      headers['Autorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}

export default new Auth;

// export default {
//   onChangeCallback: null,
//
//   signin: (email: string, password: string) => {
//     return getAuthByEmail(email).then((auth: Auth) => {
//       // If user found check password
//       if (auth) {
//         if (auth.user.password === password) {
//           this.changeAuthToken(auth.token);
//           return auth.user;
//         } else {
//           throw new CustomError('auth/wrong-password', 'Password is Wrong');
//         }
//       } else {
//         // If user not found then throw error
//         throw new CustomError('auth/user-not-found', 'Email does not have an account');
//       }
//     });
//   },
//
//   signup: function(email: string, password: string) {
//     return getAuthByEmail(email).then(auth => {
//       // Throw error if email is already in use
//       if (auth) {
//         throw new CustomError('auth/user-already-in-use', 'Email already in use');
//       }
//     });
//
//     // Create auth object
//     const newAuth = {token: generateToken(), user: {email, password}};
//     // Store auth object and signin user
//     return addAuth(newAuth).then(() => {
//       this.changeAuthToken(newAuth.token);
//       return newAuth.user;
//     });
//   },
//
//   // Updates auth token in storage and calls onChangeCallback()
//   changeAuthToken: function(authToken) {
//     storeSet("auth-token", authToken);
//     // If we have an onChangeCallback (set in this.onChange)
//     if (this.onChangeCallback) {
//       // Fetch user via token and pass to callback
//       getAuth(authToken).then(auth => {
//         this.onChangeCallback(auth ? auth.user : false);
//       });
//     }
//   },
//
//   onChange: function(cb) {
//     // Store callback function so we can also call within ...
//     // ... setAuthToken(). Necessary because storage event listener ...
//     // ... only fires when local storage is changed by another tab.
//     this.onChangeCallback = cb;
//
//     const handleTokenChange = token => {
//       getAuth(token).then(auth => {
//         this.onChangeCallback(auth ? auth.user : false);
//       });
//     };
//
//     const listener = window.addEventListener(
//       'storage',
//       ({ key, newValue }) => {
//         if (key === 'auth-token') {
//           handleTokenChange(JSON.parse(newValue));
//         }
//       },
//       false
//     );
//
//     const authToken = storeGet('auth-token');
//     handleTokenChange(authToken);
//
//     // Return an unsubscribe function so consumer ...
//     // ... can unsubscribe when needed.
//     return () => {
//       window.removeEventListener('storage', listener);
//     };
//   },
// };
//
//
// /***** HELPERS *****/
//
// function storeGet(key: string, defaultValue = null) {
//   const value = window.localStorage.getItem(key);
//   return value ? JSON.parse(value) : defaultValue;
// }
//
// function storeSet(key: string, value: string) {
//   window.localStorage.setItem(key, JSON.stringify(value));
// }
//
// function storeRemove(key: string) {
//   window.localStorage.removeItem(key);
// }
