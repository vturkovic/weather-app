import { useState } from "react";
import NavbarComponent from "../navbarComponent/navbarComponent";
import SearchComponent from "../searchComponent/searchComponent";
import WeatherCardComponent from "./weatherCardComponent/weatherCardComponent";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const OPENWEATHERMAP_API_KEY = '9ef3840b9723fd7a9720b553241bcbbc';
const UNITS = 'metric';

const WeatherComponent = () => {

  interface WeatherData {
    placename: string;
    weatherInfo: object;
  }
  

  const [placename, setPlacename] = useState<string>('');
  const [coords, setCoords] = useState<object>({});
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlaceNameChanged = (placename: string, coords: {lat: number, lng: number}) => {
    setPlacename(placename);
    setCoords(coords); // reset weather info

    fetchWeatherInfo(coords, placename);
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
      <NavbarComponent />
      <div className="weather-container">
          <SearchComponent onPlaceNameChanged={handlePlaceNameChanged}/>
          {weatherData.slice().reverse().map((data, index) => (
            <WeatherCardComponent
              key={index}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
            />
          ))}
          {isLoading ? <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : null }
        </div>
    </div>
  );
};

export default WeatherComponent;





/* isLoading ? <Spinner animation="border" role="status">
<span className="visually-hidden">Loading...</span>
</Spinner> : null */