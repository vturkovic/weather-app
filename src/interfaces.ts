import firebase from 'firebase/compat/app';

export type LoginErrorType = string | firebase.FirebaseError;

export interface FormInterface {
    email: string,
    password: string
}

export interface LoginInterface {
    onLogin: (email: string, password: string) => Promise<void>,
    loginError: LoginErrorType | null
}