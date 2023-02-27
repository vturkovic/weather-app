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

export interface WeatherDataInterface {
    placename: string,
    weatherInfo: object,
}

export type SearchComponentProps = {
    onPlaceNameChanged: (placename: string, coords: {lat: number, lng: number}) => void;
}

export interface WeatherData {
    id: number,
    placename: string,
    weatherInfo: any,
    isFavorite: boolean,
}

export interface WeatherDataState {
    weatherData: WeatherData[],
}