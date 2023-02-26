import { WeatherDataState }  from '@interfaces';

const initialState: WeatherDataState = {
  weatherData: [],
};

const weatherDataReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'ADD_WEATHER_DATA':
      return {
        ...state,
        weatherData: [...state.weatherData, action.payload],
      };
    case 'REMOVE_WEATHER_DATA':
      const newData = state.weatherData.filter(data => data.placename !== action.payload);
      return {
        ...state,
        weatherData: newData,
      };
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        weatherData: action.payload,
      };
    case 'TOGGLE_FAVORITE_PLACE':
      const updatedWeatherData = state.weatherData.map(data => {
        if (data.placename === action.payload.placename) {
          return { ...data, isFavorite: action.payload.isFavorite };
        }
        return data;
      });
      return {
        ...state,
        weatherData: updatedWeatherData,
      };
    default:
      return state;
  }
};


export default weatherDataReducer;