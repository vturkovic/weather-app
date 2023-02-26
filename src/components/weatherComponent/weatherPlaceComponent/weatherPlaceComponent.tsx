import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DayCardComponent from './dayCardComponent/dayCardComponent';
import { RootState } from '@reduxStore';
import { searchObjectsByPlacename, shortenString } from '@helperService';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { OPENWEATHERMAP_API_KEY, OPENWEATHERMAP_API_EXCLUDE, UNITS } from '@constants';

export const WeatherPlaceComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const place = useSelector((state: RootState) => state.selectedPlace.selectedPlace);
  const weatherDataArray = useSelector((state: RootState) => state.weatherData.weatherData);
  const placeWeatherData = searchObjectsByPlacename(place?.toString(), weatherDataArray);

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
    fetchWeatherInfo({
      lat: placeWeatherData.weatherInfo.lat, 
      lng: placeWeatherData.weatherInfo.lon
    });
  }, []);

  return (
    <div className="weather-place-container">
      <div className="weather-place-title">
        <h2>5-day-weather for {`${shortenString(place?.charAt(0).toUpperCase()+place?.slice(1))}`}</h2>
      </div>
      <div className="day-cards-container">
        {isLoading ? <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null } 
        {weatherData.map((data: any, index: number) => {
            return (<DayCardComponent
              key={index}
              weatherInfo={data}
              onClick={handleCardOnClick}
            />)
          })}
      </div>
    </div>
  );
};

export default WeatherPlaceComponent;