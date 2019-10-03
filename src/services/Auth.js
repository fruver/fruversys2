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