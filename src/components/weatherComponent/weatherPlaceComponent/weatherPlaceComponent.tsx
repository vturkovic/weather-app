import { useParams } from 'react-router-dom';

export const WeatherPlaceComponent = () => {

  const { place } = useParams();

  return (
    <div>
      <h1>Weather for {place}</h1>
    </div>
  );
};

export default WeatherPlaceComponent