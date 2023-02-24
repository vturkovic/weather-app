import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { transformUnixTimestamp } from '../../../../services/helperService/helperService';
 
const DayCardComponent = ( props : any ) => {

  const CARD_WIDTH = '40rem';
  const CARD_HEIGHT = '6rem';

  const imgSrc = `http://openweathermap.org/img/wn/${props.weatherInfo.weather[0].icon}@2x.png`

  const handleCardOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const day = event.currentTarget.getAttribute('data-day');
    props.onClick(day);
  };
  
  return (
    <div data-day={props.weatherInfo.dt} onClick={handleCardOnClick}>
      <Card style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
          <Card.Body>
              <Image src={imgSrc} fluid/>
              <Card.Title>{transformUnixTimestamp(props.weatherInfo.dt)}</Card.Title>
              <Card.Text>{`Min: ${props.weatherInfo.temp.min.toFixed(1)} °C Max: ${props.weatherInfo.temp.max.toFixed(1)} °C`}</Card.Text>
          </Card.Body>
      </Card>
    </div>
  );
}

export default DayCardComponent;