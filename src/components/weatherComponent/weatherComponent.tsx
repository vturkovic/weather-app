import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SearchComponent from "../searchComponent/searchComponent";
import WeatherCardComponent from "./weatherCardComponent/weatherCardComponent";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { extractFirstSubstring } from '@helperService';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherData, addWeatherData, removeWeatherData, setSelectedPlace, toggleFavoritePlace } from '@reduxActions';
import { RootState } from '@reduxStore';
import { OPENWEATHERMAP_API_KEY, OPENWEATHERMAP_API_EXCLUDE, UNITS, MAX_PLACES_ALERT_MESSAGE } from '@constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { updateWeatherDataFirebase, toggleFavoritePlaceFirebase, removeWeatherDataFirebase } from '@firebaseActions';


const WeatherComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherDataCount, setWeatherDataCount] = useState<number>(0);
  const weatherDataRedux = useSelector((state: RootState) => state.weatherData.weatherData);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const weatherDataRef = firebase.firestore().collection('weatherData').doc(userId);
      weatherDataRef.get().then((doc) => {
        if (doc && doc.exists) {
          const weatherData = doc.data()?.weatherData || [];
          dispatch(setWeatherData(weatherData));
        }
      }).catch((error) => {
        console.error('Error getting weather data:', error);
      });
    }
  }, [dispatch]);
  
  const handlePlacename = (placename: string, coords: {lat: number, lng: number}) => {
    if (weatherDataCount < 10) {
      fetchWeatherInfo(coords, placename, dispatch);
      setWeatherDataCount(count => count + 1);
    } else {
      const shouldAddMoreData = window.confirm(MAX_PLACES_ALERT_MESSAGE);
      if (shouldAddMoreData) {
        fetchWeatherInfo(coords, placename, dispatch);
        setWeatherDataCount(count => count + 1);
      }
    }
  };  

  const fetchWeatherInfo = async (coords: {lat: number, lng: number}, placename: string, dispatch: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=${OPENWEATHERMAP_API_EXCLUDE}&appid=${OPENWEATHERMAP_API_KEY}&units=${UNITS}`);
      const weatherInfo = response.data;
      const weatherDataResponse = { placename, weatherInfo, isFavorite: false }
      dispatch(addWeatherData(weatherDataResponse));
      updateWeatherDataFirebase(weatherDataResponse);
    } catch (error) {
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCard = (placename: string) => {
    dispatch(removeWeatherData(placename));
    removeWeatherDataFirebase(placename);
  };

  const handleCardOnClick = (place: string) => {
    navigate('/weather/' + extractFirstSubstring(place));
    dispatch(setSelectedPlace(place));
  };

  
  const handleFavoriteToggle = (placename: string, isFavorite: boolean) => {
    dispatch(toggleFavoritePlace({ placename, isFavorite }));
    toggleFavoritePlaceFirebase(placename, isFavorite);
  };


  return (
    <div>
      <div className="weather-container">
          <SearchComponent onPlaceNameChanged={handlePlacename}/>
          {isLoading ? <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null }
          {weatherDataRedux.slice().reverse().map((data:any, index: any) => (
            <WeatherCardComponent
              key={index}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
              onClick={handleCardOnClick}
              onRemove={handleRemoveCard} 
              onFavoriteToggle={handleFavoriteToggle}
              hasFavoriteToggle={true}
            />
          ))}
        </div>
    </div>
  );
};

export default WeatherComponent;