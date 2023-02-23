export const addWeatherData = (payload: {}): any => ({
    type: 'ADD_WEATHER_DATA',
    payload
});

export const removeWeatherData = (payload: string): any => ({
    type: 'REMOVE_WEATHER_DATA',
    payload
});

export const authLogin = (): any => ({
    type: 'LOGIN'
});
  
  export const authLogout = (): any => ({
    type: 'LOGOUT'
});