import { WeatherDataInterface } from '@interfaces'

export const addWeatherData = (payload: WeatherDataInterface): any => ({
    type: 'ADD_WEATHER_DATA',
    payload
});

export const removeWeatherData = (payload: number): any => ({
    type: 'REMOVE_WEATHER_DATA',
    payload
});

export const setWeatherData = (payload: WeatherDataInterface): any => ({
    type: 'SET_WEATHER_DATA',
    payload
});

export const addFavoriteWeatherData = (payload: WeatherDataInterface): any => ({
    type: 'ADD_FAVORITE_WEATHER_DATA',
    payload
});

export const removeFavoriteWeatherData = (payload: number): any => ({
    type: 'REMOVE_FAVORITE_WEATHER_DATA',
    payload
});

export const setFavoriteWeatherData = (payload: WeatherDataInterface[]): any => ({
    type: 'SET_FAVORITE_WEATHER_DATA',
    payload
});

export const addFavoritePlace = (payload: boolean): any => ({
    type: 'ADD_FAVORITE_PLACE',
    payload
});

export const removeFavoritePlace = (payload: boolean): any => ({
    type: 'REMOVE_FAVORITE_PLACE',
    payload
});

export const toggleFavoritePlace = (data: { id: number, isFavorite: boolean }) => ({
    type: 'TOGGLE_FAVORITE_PLACE',
    payload: data
});

export const authLogin = (): any => ({
    type: 'LOGIN'
});
  
export const authLogout = (): any => ({
    type: 'LOGOUT'
});

export const setSelectedPlace = (payload: string): any => ({
    type: 'SET_SELECTED_PLACE',
    payload
});