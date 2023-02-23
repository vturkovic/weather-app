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