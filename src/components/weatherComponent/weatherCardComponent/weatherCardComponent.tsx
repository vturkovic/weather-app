import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import CloseButton from 'react-bootstrap/CloseButton';
import ToggleButtonComponent from '../../toggleButtonComponent/toggleButtonComponent';

const WeatherCardComponent = ( props : any ) => {

    console.log('props', props)

  const CARD_WIDTH = '50rem';
  const CARD_HEIGHT = '6rem';

  const imgSrc = `http://openweathermap.org/img/wn/${props.weatherInfo.current.weather[0].icon}@2x.png`

  return (
    <div className="cards-container">
        <Card style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
            <Card.Body>
                <Image src={imgSrc} fluid/>
                <Card.Title>{props.placename}</Card.Title>
                <Card.Text>{props.weatherInfo.current.weather[0].description}</Card.Text>
                <Card.Title>{props.weatherInfo.current.temp.toFixed(1)} °C</Card.Title>
                <div className="cardButtons">
                    <ToggleButtonComponent />
                    <CloseButton />
                </div>
            </Card.Body>
        </Card>
    </div>
  );
}

export default WeatherCardComponent;