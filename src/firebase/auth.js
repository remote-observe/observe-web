import React from 'react';
import * as firebase from 'firebase';
import {prodConfig, devConfig} from './config';

!firebase.apps.length &&
  firebase.initializeApp(
    window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('ielocal')
      ? devConfig
      : prodConfig,
  );

export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth;
window.firebase = firebase;

export function signIn() {
  return auth()
    .setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(function() {
      return auth()
        .signInWithPopup(provider)
        .then(result => result.user)
        .then(user => {
          return auth().currentUser;
        });
    });
}

export function signOut() {
  localStorage.removeItem('user');
  auth.signOut();
}

export function getUser() {
  return auth().currentUser;
}

export function hasAccess(user) {
  return db.collection('users')
    .doc(user.email).get()
    .then(doc => doc.exists)
    .catch(error => {
      console.error(error);
      return false;
    });
}

window.hasAccess = hasAccess;

export const UserContext = React.createContext(null);
