import { useNavigate } from 'react-router-dom';
import WeatherCardComponent from "../weatherComponent/weatherCardComponent/weatherCardComponent";
import { extractFirstSubstring } from '@helperService';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace, toggleFavoritePlace } from '@reduxActions';
import { RootState } from '@reduxStore';
import { toggleFavoritePlaceFirebase } from '@firebaseActions';


const FavoritesComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weatherData = useSelector((state: RootState) => state.weatherData.weatherData.filter((data: any) => data.isFavorite));

  const handleRemoveFromFavorites = (placename: string, isFavorite = false) => {
    dispatch(toggleFavoritePlace({ placename, isFavorite: false }));
    toggleFavoritePlaceFirebase(placename, false);
  };

  const handleCardOnClick = (place: string) => {
    navigate('/weather/' + extractFirstSubstring(place));
    dispatch(setSelectedPlace(place));
  };

  return (
    <div>
      <div className="weather-container favorites-container">
          {weatherData.slice().reverse().map((data:any, index: number) => (
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