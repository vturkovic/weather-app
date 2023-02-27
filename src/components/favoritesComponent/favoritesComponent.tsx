import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherCardComponent from "../weatherComponent/weatherCardComponent/weatherCardComponent";
import Spinner from 'react-bootstrap/Spinner';
import { extractFirstSubstring } from '@helperService';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace, toggleFavoritePlace, removeFavoriteWeatherData, setFavoriteWeatherData } from '@reduxActions';
import { RootState } from '@reduxStore';
import { toggleFavoritePlaceFirebase, removeFavoriteWeatherDataFirebase } from '@firebaseActions';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const FavoritesComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const favorites = useSelector((state: RootState) => state.favorites.weatherData);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const weatherDataRef = firebase.firestore().collection('favorites').doc(userId);
      weatherDataRef.get().then((doc) => {
        if (doc && doc.exists) {
          const weatherData = doc.data()?.favorites || [];
          dispatch(setFavoriteWeatherData(weatherData));
        }
      }).catch((error) => {
        console.error('Error getting weather data:', error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch]);

  const handleRemoveFromFavorites = (id: number, placename: string, isFavorite = false) => {
    dispatch(toggleFavoritePlace({ id, isFavorite }));
    toggleFavoritePlaceFirebase(id, isFavorite);

    //
    dispatch(removeFavoriteWeatherData(id));
    removeFavoriteWeatherDataFirebase(id);
  };

  const handleCardOnClick = (place: string) => {
    navigate('/weather/' + extractFirstSubstring(place));
    dispatch(setSelectedPlace(place));
  };

  if (isLoading) {
    return (
      <div className="app-spinner-container">
        <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="weather-container favorites-container">
          {favorites.length > 0 ? favorites.slice().reverse().map((data:any, index: number) => (
            <WeatherCardComponent
              key={index}
              id={data.id}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
              onClick={handleCardOnClick}
              onRemove={handleRemoveFromFavorites} 
            />
          )) : <h2>No favorites selected!</h2>}
        </div>
    </div>
  );
};

export default FavoritesComponent;