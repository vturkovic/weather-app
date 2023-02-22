import { useState } from 'react';
import axios from 'axios';

type WeatherInfo = {
  // define the structure of the weather info object returned by OpenWeatherMap
}

type FetchWeatherDataProps = {
  placeName: string;
  onWeatherInfoRetrieved: (weatherInfo: WeatherInfo) => void;
}

const FetchWeatherDataComponent = ({ placeName, onWeatherInfoRetrieved }: FetchWeatherDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=YOUR_API_KEY`);
      const weatherInfo = response.data as WeatherInfo;
      onWeatherInfoRetrieved(weatherInfo);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button onClick={fetchWeatherInfo} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch weather info'}
      </button>
    </>
  );
}

type SearchComponentProps = {
  onPlaceNameChanged: (placeName: string) => void;
}

const SearchComponent = ({ onPlaceNameChanged }: SearchComponentProps) => {
  const [placeName, setPlaceName] = useState('');

  const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceName(event.target.value);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onPlaceNameChanged(placeName);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Place name:
        <input type="text" value={placeName} onChange={handlePlaceNameChange} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

type WeatherComponentProps = {}

const WeatherComponent = ({}: WeatherComponentProps) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);

  const handlePlaceNameChanged = (placeName: string) => {
    setWeatherInfo(null); // reset weather info
    // pass the place name to the fetchWeatherData component
    <FetchWeatherDataComponent
      placeName={placeName}
      onWeatherInfoRetrieved={setWeatherInfo}
    />
  }

  return (
    <>
      <SearchComponent onPlaceNameChanged={handlePlaceNameChanged} />
      {weatherInfo && ('asdasd'
        // render weather info on a map or display it in another way
      )}
    </>
  );
}
