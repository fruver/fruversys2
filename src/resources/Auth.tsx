import * as localForage from 'localforage';
import jwtDecode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import {DOMAIN_API} from '../constants/routes';

interface Author {
  access: string;
  refresh: string;
  token_type: string;
  exp: number;
  jti: string;
  user_id: number;
}

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isActive: boolean;
}

class Auth  {
  // Use Rxjs

  // Properties
  // initial null
  currentUserSubject = new BehaviorSubject(localForage.getItem('auth:user'));

  onAuthStateChanged = this.currentUserSubject.asObservable()

  currentUser = async () => {
    // Can return User or null.
    return await localForage.getItem('auth:user').then( resp => {
      console.log(`currentUser ${resp}`);
      return resp;
    });
  }

  // Properties

  get user() {
    return this.currentUser();
  }

  get isAuthenticated() {
    const expiresAt = this.currentUser ? this.currentUser.exp * 1000 : null;
    if (expiresAt) {
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }

  // isAuthenticated = () => {
  //  // pass date exp
  // return new Date().getTime() < this.expiresAt;
  // };

  signIn = (email: string, password: string) => {
    // Get token authorization
    const auth: Promise<AuthInterface> = this.fetchSignIn(email, password);
    // Get user info
    const user: Promise<void | never> = this.fetchUser(auth.user_id).then(resp => {
      const newAuth = {...auth, ...resp};
      console.log('user testing....')
      // Use localForage for set new auth:user
      localForage.setItem('auth:user', newAuth).then( resp => {
        console.log(`set token auth:user ${JSON.stringify(resp)}`);
        console.log(resp.exp);
      });

    });

    console.log('test');

    // store user details and jwt token in local storage to keep user logged in between page refreshes
    const newAuth = {...auth, ...user};

    console.log(`currentUser: ${this.currentUser()}`);

    return newAuth;
  };


  //////////
  // Fetchs
  /////////

  fetchUser = async (userId: number) => {
    return await this.fetch(`users/${userId}`, {
      'method': 'GET'
    }).then(user => {
      return user;
    }).catch(error => {
      throw error;
    });
  };

  fetchSignIn = async (email: string, password: string) => {
    return await this.fetch('token-auth/', {
      'method': 'POST',
      'body': JSON.stringify({email, password})
    }).then(auth => {
      const authDecode = jwtDecode(auth.access);
      const newAuth: AuthInterface = {...auth, ...authDecode};
      return newAuth;
    });
  };

  fetch = async (path: string, options: any) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${DOMAIN_API}/${path}`, {
      cache: 'default',
      headers: headers,
      ...options
    });

    return await response.json();
  };
}

export default new Auth;