import * as firebase from 'firebase/app';
import 'firebase/auth';

export const signIn = async (email: string, password: string) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (reason) {
    throw reason;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return resp;
  } catch(reason) {
    throw reason;
  }
};

export const signOut = () => firebase.auth().signOut();


// export const loginWithEmailAndPassword = async (email: string, password: string) => {
//   try {
//     await firebase.auth().signInWithEmailAndPassword(email, password);
//   } catch(reason) {
//     throw reason;
//   }
// };
//
// export const createUserWithEmailAndPassword = async (email: string, password: string) => {
//   try {
//     return await firebase.auth().createUserWithEmailAndPassword(email, password);
//   } catch(reason) {
//     throw reason;
//   }
// };
//
// export const sendEmailVerification = async (user: firebase.User) => {
//   try {
//     await user.sendEmailVerification();
//   } catch(reason) {
//     throw reason;
//   }
// };
//
// export const signOut = () => firebase.auth().signOut();