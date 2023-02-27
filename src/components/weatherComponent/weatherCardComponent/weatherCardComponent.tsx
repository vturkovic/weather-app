import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ToggleButtonComponent from '../../toggleButtonComponent/toggleButtonComponent';
import { shortenString } from '@helperService';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxStore';
import { CARD_WIDTH, CARD_HEIGHT } from '@constants';

const WeatherCardComponent = ( props : any ) => {

  const isFavorite = useSelector((state: RootState) => {
    const weatherData = state.weatherData.weatherData;
    const currentWeatherData = weatherData.find((data: any) => data.placename === props.placename);
    return currentWeatherData ? currentWeatherData.isFavorite : false;
  });

  const imgSrc = `http://openweathermap.org/img/wn/${props.weatherInfo.current.weather[0].icon}@2x.png`;

  const handleRemovePlace = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const cardId = event.currentTarget.closest('[data-id]')?.getAttribute('data-id');
    if (cardId) {
      props.onRemove(cardId);
    }
  };
  
  const handleCardOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as Element;
    if (target.closest('.cardButtons')) {
      return;
    }
    const placename = event.currentTarget.getAttribute('data-placename');
    props.onClick(placename);
  };
  
  const handleFavoriteToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      props.onFavoriteToggle(props.placename, !isFavorite);
    },
    [isFavorite, props]
  );
  
  return (
    <div className="cards-container">
        <div data-placename={props.placename} data-id={props.id} onClick={handleCardOnClick}>
            <Card style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
                <Card.Body>
                    <Image src={imgSrc} fluid/>
                    <div className="card-main-text">
                      <Card.Text>{shortenString(props.placename)}</Card.Text>
                      <Card.Text className="card-description">{props.weatherInfo.current.weather[0].description}</Card.Text>
                    </div>        
                    <Card.Title>{props.weatherInfo.current.temp.toFixed(1)} °C</Card.Title>
                    <div className="cardButtons">
                        {props.hasFavoriteToggle ? <ToggleButtonComponent onClick={handleFavoriteToggle} isFavorite={isFavorite}/> : null}
                        <button onClick={handleRemovePlace} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </div>
  );
};

export default WeatherCardComponent;