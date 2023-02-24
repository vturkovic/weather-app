import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import WeatherCardComponent from "../weatherComponent/weatherCardComponent/weatherCardComponent";
import Spinner from 'react-bootstrap/Spinner';
import { extractFirstSubstring } from '../../services/helperServices/helperService';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace, toggleFavoritePlace } from '../../redux/actions';
import { RootState } from '../../redux/store';

const FavoritesComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weatherData = useSelector((state: RootState) => state.weatherData.weatherData.filter((data: any) => data.isFavorite));

  const handleRemoveFromFavorites = (placename: string) => {
    dispatch(toggleFavoritePlace({ placename, isFavorite: false }))
  };

  const handleCardOnClick = (place: string) => {
    navigate('/weather/' + extractFirstSubstring(place));
    dispatch(setSelectedPlace(place));
  };


  return (
    <div>
      <div className="weather-container favorites-container">
          {weatherData.slice().reverse().map((data:any, index: any) => (
            <WeatherCardComponent
              key={index}
              placename={data.placename}
              weatherInfo={data.weatherInfo}
              onClick={handleCardOnClick}
              onRemove={handleRemoveFromFavorites} 
              hasFavoriteToggle={false} />
          ))}
        </div>
    </div>
  );
};

export default FavoritesComponent;