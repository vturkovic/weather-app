import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FirebaseError } from 'firebase/app';
import { firebaseConfig } from '../firebase/firebaseConfig';
import moment from 'moment';
import { authLogin, authLogout } from '../../redux/actions';

const SESSION_DURATION = 20 * 60 * 1000; //ms

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const authService = {

  async login(email: string, password: string): Promise<string | null> {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = email + moment().format();
      localStorage.setItem('X-token', token || '');

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