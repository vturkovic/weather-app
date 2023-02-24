import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchComponent from "../searchComponent/searchComponent";
import WeatherCardComponent from "./weatherCardComponent/weatherCardComponent";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { extractFirstSubstring } from '../../services/helperService/helperService';
import { useDispatch, useSelector } from 'react-redux';
import { addWeatherData, removeWeatherData, setSelectedPlace, toggleFavoritePlace } from '../../redux/actions';
import { RootState } from '../../redux/store';

const OPENWEATHERMAP_API_KEY = '9ef3840b9723fd7a9720b553241bcbbc';
const OPENWEATHERMAP_API_EXCLUDE = 'minutely,alerts';
const UNITS = 'metric';
const MAX_PLACES_ALERT_MESSAGE = 'You have added 10 places. Do you want to add more?';

const WeatherComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weatherData = useSelector((state: RootState) => state.weatherData.weatherData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherDataCount, setWeatherDataCount] = useState<number>(0);

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
      dispatch(addWeatherData({ placename, weatherInfo, isFavorite: false }));
    } catch (error) {
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCard = (placename: string) => {
    dispatch(removeWeatherData(placename));
  };

  const handleCardOnClick = (place: string) => {
    navigate('/weather/' + extractFirstSubstring(place));
    dispatch(setSelectedPlace(place));
  };

  const handleFavoriteToggle = (placename: string, isFavorite: boolean) => {
    dispatch(toggleFavoritePlace({ placename, isFavorite }))
  };

  return (
    <div>
      <div className="weather-container">
          <SearchComponent onPlaceNameChanged={handlePlacename}/>
          {isLoading ? <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null }
          {weatherData.slice().reverse().map((data:any, index: any) => (
            <WeatherCardComponent
              key={index}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
              onClick={handleCardOnClick}
              onRemove={handleRemoveCard} 
              onFavoriteToggle={handleFavoriteToggle}
              hasFavoriteToggle={true}/>
          ))}
        </div>
    </div>
  );
};

export default WeatherComponent;