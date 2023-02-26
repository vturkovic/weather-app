import { configureStore, Action } from '@reduxjs/toolkit';
import weatherDataReducer from './reducers/weatherDataReducer';
import authReducer from './reducers/authReducer';
import selectedPlaceReducer from './reducers/selectedPlaceReducer'

const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
    auth: authReducer,
    selectedPlace: selectedPlaceReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootAction = Action;

export default store;