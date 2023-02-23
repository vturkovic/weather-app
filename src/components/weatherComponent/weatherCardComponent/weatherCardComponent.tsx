import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import ToggleButtonComponent from '../../toggleButtonComponent/toggleButtonComponent';

const WeatherCardComponent = ( props : any ) => {

  const CARD_WIDTH = '50rem';
  const CARD_HEIGHT = '6rem';

  const imgSrc = `http://openweathermap.org/img/wn/${props.weatherInfo.current.weather[0].icon}@2x.png`

  const shortenString = (str: string): string => {
    if (str.length > 20) {
      const commaIndex = str.indexOf(',');
      if (commaIndex >= 0) {
        // return the substring before the first comma
        return str.substring(0, commaIndex);
      } else {
        // if there's no comma, just return the first 20 characters
        return str.substring(0, 20);
      }
    } else {
      // if the string is 20 characters or less, just return the original string
      return str;
    }
  };

  const handleRemovePlace = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const placename = event.currentTarget.closest('[data-placename]')?.getAttribute('data-placename');
    if (placename) {
      props.onRemove(placename);
    }
  };
  
  const handleCardOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const placename = event.currentTarget.getAttribute('data-placename');
    props.onClick(placename);
  };
  
  return (
    <div className="cards-container">
        <div data-placename={props.placename} onClick={handleCardOnClick}>
            <Card style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
                <Card.Body>
                    <Image src={imgSrc} fluid/>
                    <Card.Title>{shortenString(props.placename)}</Card.Title>
                    <Card.Text>{props.weatherInfo.current.weather[0].description}</Card.Text>
                    <Card.Title>{props.weatherInfo.current.temp.toFixed(1)} °C</Card.Title>
                    <div className="cardButtons">
                        <ToggleButtonComponent />
                        <button onClick={handleRemovePlace} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default WeatherCardComponent;