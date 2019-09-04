import Dexie from 'dexie';

export interface Author {
  uid: number;
  token: string;
  exp: number;
  jti: string;
}

class AuthorDB extends Dexie {
  tokenManager: Dexie.Table<Author, number>;

  constructor() {
    super('AuthorDB');

    this.version(5).stores({
      tokenManager: '&key,uid,token,exp,jti,refresh'
    });

    // Let's physically map Contact class to contacts table.
    // This will make it possible to call loadEmailsAndPhones()
    // directly on retrieved database objects.

    this.tokenManager = this.table('tokenManager');
  }
}

export default AuthorDB;
