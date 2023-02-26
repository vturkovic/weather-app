import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { transformUnixTimestamp } from '@helperService';
import { CARD_WIDTH, CARD_HEIGHT } from '@constants';
 
const DayCardComponent = ( props : any ) => {

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
              <Card.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightblue" viewBox="0 0 16 16">
                  <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                </svg>
                {`${props.weatherInfo.temp.min.toFixed(1)} °C `} 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"  viewBox="0 0 16 16">
                  <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                </svg> 
                {`${props.weatherInfo.temp.max.toFixed(1)} °C`}
              </Card.Text>
          </Card.Body>
      </Card>
    </div>
  );
}

export default DayCardComponent;