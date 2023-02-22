import { useState } from "react";
import SearchComponent from "../searchComponent/searchComponent";
import WeatherCardComponent from "./weatherCardComponent/weatherCardComponent";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { WeatherData } from '../../interfaces';

const OPENWEATHERMAP_API_KEY = '9ef3840b9723fd7a9720b553241bcbbc';
const UNITS = 'metric';
const ALERT_MESSAGE = 'You have added 10 places. Do you want to add more?';

const WeatherComponent = () => {

  const [placename, setPlacename] = useState<string>('');
  const [coords, setCoords] = useState<object>({});
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherDataCount, setWeatherDataCount] = useState<number>(0);

  const handlePlaceNameChanged = (placename: string, coords: {lat: number, lng: number}) => {
    setPlacename(placename);
    setCoords(coords);
  
    if (weatherDataCount < 10) {
      fetchWeatherInfo(coords, placename);
      setWeatherDataCount(count => count + 1);
    } else {
      const shouldAddMoreData = window.confirm(ALERT_MESSAGE);
      if (shouldAddMoreData) {
        fetchWeatherInfo(coords, placename);
        setWeatherDataCount(count => count + 1);
      }
    }
  };  

  const fetchWeatherInfo = async (coords: {lat: number, lng: number}, placename: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${OPENWEATHERMAP_API_KEY}&units=${UNITS}`);
      const weatherInfo = response.data;
      setWeatherData(prevData => [...prevData, { placename, weatherInfo }]); // combine placename and weather info
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="weather-container">
          <SearchComponent onPlaceNameChanged={handlePlaceNameChanged}/>
          {isLoading ? <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null }
          {weatherData.slice().reverse().map((data, index) => (
            <WeatherCardComponent
              key={index}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
            />
          ))}
        </div>
    </div>
  );
};

export default WeatherComponent;