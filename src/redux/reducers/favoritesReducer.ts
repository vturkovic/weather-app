import { WeatherDataState }  from '@interfaces';

const initialState: WeatherDataState = {
  weatherData: [],
};

const favorites = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'ADD_FAVORITE_WEATHER_DATA':
      return {
        ...state,
        weatherData: [...state.weatherData, action.payload],
      };
    case 'REMOVE_FAVORITE_WEATHER_DATA':
      const newData = state.weatherData.filter(data => data.id !== action.payload);
      return {
        ...state,
        weatherData: newData,
      };
    case 'SET_FAVORITE_WEATHER_DATA':
        return {
            ...state,
            weatherData: [...action.payload],
        };
    default:
      return state;
  }
};


export default favorites;