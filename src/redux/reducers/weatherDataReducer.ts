interface WeatherDataItem {
  placename: string;
  weatherInfo: Record<string, unknown>;
}

interface WeatherDataState {
  weatherData: WeatherDataItem[];
}

const initialState: WeatherDataState = {
  weatherData: []
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
    default:
      return state;
  }
};


export default weatherDataReducer;