import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DayCardComponent from './dayCardComponent/dayCardComponent';
import { RootState } from '@reduxStore';
import { searchObjectsByPlacename, shortenString } from '@helperService';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { OPENWEATHERMAP_API_KEY, OPENWEATHERMAP_API_EXCLUDE, UNITS } from '@constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { setWeatherData as setWeatherDataRedux } from '@reduxActions';


export const WeatherPlaceComponent = () => {

  const { place } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  
  const placeState = useSelector((state: RootState) => state.selectedPlace.selectedPlace);
  const weatherDataArray = useSelector((state: RootState) => state.weatherData.weatherData);
  const placeWeatherData = searchObjectsByPlacename(placeState?.toString(), weatherDataArray);

  const [placeName, setPlaceName] = useState(placeState);

  const handleCardOnClick = (day: string) => {
    navigate(currentPath + '/' + day);
  };

  const fetchWeatherInfo = async (coords: {lat: number, lng: number}) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=${OPENWEATHERMAP_API_EXCLUDE}&appid=${OPENWEATHERMAP_API_KEY}&units=${UNITS}`);
      const weatherInfo = response.data;
      setWeatherData(weatherInfo.daily.slice(0, 5));
    } catch (error) {
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (weatherDataArray.length > 0) {
      fetchWeatherInfo({
        lat: placeWeatherData.weatherInfo.lat, 
        lng: placeWeatherData.weatherInfo.lon
      });
    } else {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const weatherDataRef = firebase.firestore().collection('weatherData').doc(userId);
        weatherDataRef.get().then((doc) => {
          if (doc && doc.exists) {
            const weatherData = doc.data()?.weatherData || [];
            const placeDecoded = place ? decodeURIComponent(place) : '';
            setPlaceName(placeDecoded);
            const placeWeatherData = weatherData.find((obj:any) => obj.placename.includes(placeDecoded));
            fetchWeatherInfo({
              lat: placeWeatherData.weatherInfo.lat, 
              lng: placeWeatherData.weatherInfo.lon
            });
            dispatch(setWeatherDataRedux(weatherData));
          }
        }).catch((error) => {
          console.error('Error getting weather data:', error);
        });
      }
    }
  }, []);

  return (
    <div className="weather-place-container">
      <div className="weather-place-title">
        <h2>5-day-weather for {`${shortenString(placeName?.charAt(0).toUpperCase()+placeName?.slice(1))}`}</h2>
      </div>
      <div className="day-cards-container">
        {isLoading ? <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null } 
        {weatherData.length > 0 ? weatherData.map((data: any, index: number) => {
            return (<DayCardComponent
              key={index}
              weatherInfo={data}
              onClick={handleCardOnClick}
            />)
          }): null}
      </div>
    </div>
  );
};

export default WeatherPlaceComponent;