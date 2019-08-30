import * as firebase from 'firebase/app';
import 'firebase/auth';




export default {
  signInWithEmailAndPassword: async (
    email: string,
    password: string
  ) => {
    try {
      const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
      return resp;
    } catch (reason) {
      throw reason;
    }
  },

  signInAnonymously: async () => {
    try {
      const resp = await firebase.auth().signInAnonymously()
      return resp;
    } catch (reason) {
      throw reason;
    }
  },

  createUserWithEmailAndPassword: async (
    email: string,
    password: string,
    ...rest: any
  ) => {
    try {
      const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return resp;
    } catch (reason) {
      throw reason;
    }
  },

  signOut: async () => firebase.auth().signOut()

};