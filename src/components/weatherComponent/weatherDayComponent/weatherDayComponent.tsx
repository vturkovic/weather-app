import { useParams } from 'react-router-dom';

export const WeatherDayComponent = () => {
  
  const { day } = useParams();

  return (
    <div>
      <h1>Weather for {day}</h1>
    </div>
  );
};

export default WeatherDayComponent;