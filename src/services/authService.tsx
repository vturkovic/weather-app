import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseError } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import moment from 'moment';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const authService = {

  async login (email: string, password: string): Promise<string | null> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = email + moment().format();
      localStorage.setItem('X-token', token || '');
      return '';
    } catch (error) {
      return 'Login failed. Please check your credentials and try again.';
    }
  },
  
  async logout() {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem('X-token');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      } else {
        throw new Error('Unknown error occurred during logout');
      }
    }
  },

  async isAuthenticated() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });
    });
  }
  
};

export default authService;