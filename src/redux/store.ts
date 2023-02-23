/* import { configureStore } from '@reduxjs/toolkit';
import weatherDataReducer from './reducers/weatherDataReducer';
import { authReducer } from './reducers/authReducer';

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer.reducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; */

import { configureStore, Action } from '@reduxjs/toolkit';
import weatherDataReducer from './reducers/weatherDataReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
    auth: authReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootAction = Action;

export default store;