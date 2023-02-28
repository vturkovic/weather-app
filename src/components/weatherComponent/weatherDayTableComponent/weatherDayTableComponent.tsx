import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore';
import { shortenString, filterHourlyDataByDay, transformUnixTimestamp, searchObjectsByPlacename, extractSecoundLastParamFromPath } from '@helperService';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import TableComponent from '../../tableComponent/tableComponent';
import { OPENWEATHERMAP_API_KEY, OPENWEATHER_API_NUMBER_OF_HOURS } from '@constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { setWeatherData } from '@reduxActions';


export const WeatherDayComponent = () => {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);
  const [tableRowData, setTableRowData] = useState<{ date: string, temp: string, weather: string }[]>([]);

  const tableColumnData = [
    { header: 'Date', accessor: 'date' },
    { header: 'Weather', accessor: 'weather' },
    { header: 'Temp', accessor: 'temp' }
  ];

  const { day } = useParams();

  const path = window.location.pathname
  const placeParam = extractSecoundLastParamFromPath(path);

  const placeState = useSelector((state: RootState) => state.selectedPlace.selectedPlace);
  const weatherDataArray = useSelector((state: RootState) => state.weatherData.weatherData);
  const placeWeatherData = searchObjectsByPlacename(placeState?.toString(), weatherDataArray);
  const weatherInfo = placeWeatherData?.weatherInfo;
  const placeName = placeState ? placeState : placeParam;

  useEffect(() => {
    if (weatherDataArray.length > 0) {
      fetchWeatherInfo(weatherInfo);
    } else {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const weatherDataRef = firebase.firestore().collection('weatherData').doc(userId);
        weatherDataRef.get().then((doc) => {
          if (doc && doc.exists) {
            const weatherData = doc.data()?.weatherData || [];
            const placeSearch = placeState ? placeState : placeParam;
            const placeEncoded = decodeURIComponent(placeSearch);
            const placeWeatherData = weatherData.find((obj:any) => obj.placename.includes(placeEncoded));
            fetchWeatherInfo({
              lat: placeWeatherData.weatherInfo.lat, 
              lon: placeWeatherData.weatherInfo.lon
            });
            dispatch(setWeatherData(weatherData));
          }
        }).catch((error) => {
          console.error('Error getting weather data:', error);
        });
      }
    }
    
  }, []);

  useEffect(() => {
    const resultArray = filterHourlyDataByDay(hourlyData, day);
    setTableRowData(resultArray);
  }, [hourlyData, day]); 

  const fetchWeatherInfo = async (weatherInfo: any) => {
    setIsLoading(true);
    try {
      const response: any = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.lat}&lon=${weatherInfo.lon}&appid=${OPENWEATHERMAP_API_KEY}&dt=${day}&cnt=${OPENWEATHER_API_NUMBER_OF_HOURS}&units=metric`);
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
        <h2>Hourly weather for {`${decodeURIComponent(shortenString(placeName?.charAt(0).toUpperCase()+placeName?.slice(1)))}, ${day ? transformUnixTimestamp(parseInt(day)): null}`}</h2>
      </div>
      <div className="day-cards-container">
        {isLoading ? 
          <Spinner className="spinner" animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : <>
          {tableRowData.length > 0 ? (
            <TableComponent tableRowData={tableRowData} tableColumnData={tableColumnData}/>
          ) : null}
        </>}
      </div>
    </div>
  );
};

export default WeatherDayComponent;