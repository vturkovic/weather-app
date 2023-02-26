import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FirebaseError } from 'firebase/app';
import { firebaseConfig } from '@firebaseConfig';
import { authLogin, authLogout } from '@reduxActions';
import { SESSION_DURATION } from '@constants';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const authService = {

  async login(email: string, password: string): Promise<string | null> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      const userId = user?.uid;
      localStorage.setItem('userId', userId || '');
  
      const token = email + moment().format();
      localStorage.setItem('X-token', token || '');
      
      if (userId) {
        const isAuthenticated = true;
        const authRef = db.collection('auth').doc(userId);
        authRef.set({isAuthenticated});
      }
  
      setTimeout(() => {
        this.logout();
      }, SESSION_DURATION);
  
      return '';
  
    } catch (error) {
      return 'Login failed. Please check your credentials and try again.';
    }
  },
  
  async logout() {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem('X-token');
  
      const userId = localStorage.getItem('userId');
      if (userId) {
        const isAuthenticated = false;
        const authRef = db.collection('auth').doc(userId);
        authRef.set({isAuthenticated});
      }
  
      return null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      } else {
        throw new Error('Unknown error occurred during logout');
      }
    }
  },

  async isAuthenticated(dispatch: any) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authLogin());
      } else {
        dispatch(authLogout());
      }
    });
  }
};

export default authService;