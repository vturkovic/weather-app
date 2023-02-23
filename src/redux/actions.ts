export const addWeatherData = (payload: {}): any => ({
    type: 'ADD_WEATHER_DATA',
    payload
});

export const removeWeatherData = (payload: string): any => ({
    type: 'REMOVE_WEATHER_DATA',
    payload
});

export const authLogin = (payload: string): any => ({
    type: 'LOGIN',
    payload
});

export const authLogut = (payload: string): any => ({
    type: 'LOGOUT',
    payload
});