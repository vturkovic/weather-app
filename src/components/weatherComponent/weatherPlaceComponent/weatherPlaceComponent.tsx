import { useParams } from 'react-router-dom';

export const WeatherPlaceComponent = () => {

  const { placename } = useParams();

  return (
    <div>
      <h1>Weather for {placename}</h1>
    </div>
  );
};

export default WeatherPlaceComponent