import moment from 'moment';

export const shortenString = (str: string): string => {
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

export const extractFirstSubstring = (str: string): string =>{
  // Remove all spaces and convert to lowercase
  const cleanedStr = str.replace(/\s/g, '').toLowerCase();

  // Find the index of the first comma
  const commaIndex = cleanedStr.indexOf(',');

  // If no comma was found, return the original string
  if (commaIndex === -1) {
    return cleanedStr;
  }

  // Otherwise, return the substring up to the first comma
  return cleanedStr.substring(0, commaIndex);
};

export const searchObjectsByPlacename = (input: string, objects: any[]): any | undefined => {
  const lowerInput = input.toLowerCase();
  return objects.find(obj => (obj.placename ?? '').toLowerCase().includes(lowerInput));
};

export const transformUnixTimestamp = (unixTimestamp: number) => {
  const date = moment.unix(unixTimestamp).utc();
  return date.format('dddd DD.MM.YYYY');
};

export   const filterHourlyDataByDay = (hourlyData: any[], day: any): any[] => {
  const date = new Date(parseInt(day) * 1000); // Convert unix timestamp to Date object
  const dayOfWeek = date.getUTCDay(); // Get weekday of input day (0-6 where 0 is Sunday)
  return hourlyData.filter((item) => {
    const itemDate = new Date(item.dt_txt);
    const itemDayOfWeek = itemDate.getUTCDay();
    return itemDayOfWeek === dayOfWeek;
  }).map((item) => {
    return {
      date: item.dt_txt,
      temp: item.main.temp.toFixed(1) + ' °C',
      weather: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    };
  });
};