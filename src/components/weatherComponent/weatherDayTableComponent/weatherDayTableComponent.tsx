import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { searchObjectsByPlacename } from '../../../services/helperService/helperService';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { shortenString, filterHourlyDataByDay } from '../../../services/helperService/helperService';
import TableComponent from '../../tableComponent/tableComponent';

export const WeatherDayComponent = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);
  const [tableRowData, setTableRowData] = useState<{ date: string, temp: string, weather: string }[]>([]);

  const OPENWEATHER_API_KEY = '9ef3840b9723fd7a9720b553241bcbbc';
  const NUMBER_OF_HOURS = 36;

  const tableColumnData = [
    { header: 'Date', accessor: 'date' },
    { header: 'Weather', accessor: 'weather' },
    { header: 'Temp', accessor: 'temp' }
  ];

  const { day } = useParams();
  const place = useSelector((state: RootState) => state.selectedPlace.selectedPlace);
  const weatherDataArray = useSelector((state: RootState) => state.weatherData.weatherData);
  const placeWeatherData = searchObjectsByPlacename(place?.toString(), weatherDataArray);
  const weatherInfo = placeWeatherData.weatherInfo;

  useEffect(() => {
    fetchWeatherInfo(weatherInfo);
  }, []);

  useEffect(() => {
    const resultArray = filterHourlyDataByDay(hourlyData, day);
    setTableRowData(resultArray);
  }, [hourlyData]); 

  const fetchWeatherInfo = async (weatherInfo: any) => {
    setIsLoading(true);
    try {
      const response: any = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.lat}&lon=${weatherInfo.lon}&appid=${OPENWEATHER_API_KEY}&dt=${day}&cnt=${NUMBER_OF_HOURS}&units=metric`);
      const result = response.data;
      setHourlyData(result.list);
    } catch (error) {
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-place-container">
      <div className="weather-place-title">
        <h2>Hourly weather for {`${shortenString(place?.charAt(0).toUpperCase()+place?.slice(1))}`}</h2>
      </div>
      <div className="day-cards-container">
        {isLoading ? 
          <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : 
          <>
          {tableRowData.length > 0 ? (
            <TableComponent tableRowData={tableRowData} tableColumnData={tableColumnData}/>
          ) : null}
        </>}
      </div>
    </div>
  );
};

export default WeatherDayComponent;