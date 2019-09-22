// import {API_ROUTES} from '../../constants/Routes';


// if (currentUser && tokenAccess) {
//   const isTokenAccessExpired = Auth.isTokenExpired(tokenAccess);
//   const isTokenRefreshExpired = Auth.isTokenExpired(tokenRefresh);
//   if (isTokenAccessExpired && !isTokenRefreshExpired) {
//     // Actualizamos el tokenAccess
//     const request = Auth.TokenRefresh(tokenRefresh).then(token => {
//       return next({
//         type:
//       })
//     });
//     console.log('token required refresh');
//   } else if (isTokenRefreshExpired) {
//     // Logout and Redirect to Login page.
//     console.log('tokenRefresh is expired');
//   } else {
//     // pass, tokenAccess is valid.
//     console.log('tokenAccess is valid');
//   }
// }