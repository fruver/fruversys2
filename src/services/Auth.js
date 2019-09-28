import jwtDecode from 'jwt-decode';

class Auth {

  constructor() {
    this.currentUser = this.getCurrentUser();
  }

  setUserToken = (newToken) => {
    localStorage.setItem('auth', JSON.stringify(newToken));
  };

  getTokenAccess = () => {
    return this.currentUser.access;
  };

  getTokenRefresh = () => {
    return this.currentUser.refresh;
  };

  getUserId = () => {
    return this.currentUser.uid;
  };

  logout = () => {
    localStorage.removeItem('auth');
  };

  tokenDecode = (token) => {
    try {
      const decode = jwtDecode(token);
      return decode;
    } catch (e) {
      return {};
    }
  };

  isTokenExpired = (token) => {
    try {
      const decode = jwtDecode(token);
      const {exp: expiredAt} = decode.exp * 1000;
      return new Date().getTime() >= expiredAt;
    } catch(reason) {
      console.log(reason);
      return true;
    }
  };

  handleResponse = (response) => {
    const {access, refresh} = response;
    // decode only token Access:
    const {uid, exp} = jwtDecode(access);
    return {
      uid: uid,
      tokenAccess: access,
      tokenAccessExp: exp,
      tokenRefresh: refresh,
    };
  };

  getCurrentUser = () => {
    try {
      const serializedState = localStorage.getItem('auth');
      if(serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
}

export default new Auth();