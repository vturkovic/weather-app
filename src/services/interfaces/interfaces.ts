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

export interface WeatherData {
    placename: string,
    weatherInfo: object,
}

export type SearchComponentProps = {
    onPlaceNameChanged: (placename: string, coords: {lat: number, lng: number}) => void;
}