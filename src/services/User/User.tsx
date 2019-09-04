class User {

  /////////////
  // Properties
  /////////////
  // id: number|null;
  // fullName: string|null;
  // email: string|null;
  // emailVerified: boolean|null;
  // phoneNumber: string|null;
  isAuthenticated: boolean|null;
  // isAnonymous: boolean|null;
  // expiredToken: boolean|null;

  constructor() {
    this.isAuthenticated = this._isAuthenticated();
  }

  _isAuthenticated = () => {
    // const expiresAt = this.currentUser ? this.currentUser.exp * 1000 : null;
    // if (expiresAt) {
    //   return new Date().getTime() < expiresAt;
    // } else {
    //   return false;
    // }
    return true;
  };

}

export default User;