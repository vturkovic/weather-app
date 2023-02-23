import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { searchObjectsByPlacename } from '../../../services/helperServices/helperServices'

export const WeatherPlaceComponent = () => {

  const { place } = useParams();
  const weatherDataArray = useSelector((state: any) => state.weatherData.weatherData);

  const placeWeatherData = searchObjectsByPlacename(place?.toString()?.trim() ?? '', weatherDataArray);
  console.log('placeWeatherData', placeWeatherData);

  return (
    <div>
      <h1>Weather for {place}</h1>
    </div>
  );
};

export default WeatherPlaceComponent