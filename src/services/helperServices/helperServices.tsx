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