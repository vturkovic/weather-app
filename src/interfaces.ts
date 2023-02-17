import firebase from 'firebase/compat/app';

export type LoginError = string | firebase.FirebaseError;

export interface FormInterface {
    email: string,
    password: string
}

export interface LoginInterface {
    onLogin: (email: string, password: string) => Promise<void>,
    loginError: LoginError | null
}