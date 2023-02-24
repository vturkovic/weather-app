import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchObjectsByPlacename } from '../../../services/helperService/helperService';
import DayCardComponent from './dayCardComponent/dayCardComponent';
import { RootState } from '../../../redux/store';
import { shortenString } from '../../../services/helperService/helperService';

export const WeatherPlaceComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const place = useSelector((state: RootState) => state.selectedPlace.selectedPlace);
  const weatherDataArray = useSelector((state: RootState) => state.weatherData.weatherData);
  const placeWeatherData = searchObjectsByPlacename(place?.toString(), weatherDataArray);
  const daysWeatherInfo = placeWeatherData.weatherInfo.daily.slice(0, 5);

  const handleCardOnClick = (day: string) => {
    navigate(currentPath + '/' + day);
  };

  return (
    <div className="weather-place-container">
      <div className="weather-place-title">
        <h2>5-day-weather for {`${shortenString(place?.charAt(0).toUpperCase()+place?.slice(1))}`}</h2>
      </div>
      <div className="day-cards-container">
        {daysWeatherInfo.map((data: any, index: number) => {
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