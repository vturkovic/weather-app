import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { WeatherData } from '@interfaces';

// Get a reference to the Firebase Firestore database
const db = firebase.firestore();

export const updateWeatherDataFirebase = (weatherDataResponse: any) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        const weatherDataRef = db.collection('weatherData').doc(userId);
        weatherDataRef.update({
        weatherData: firebase.firestore.FieldValue.arrayUnion(weatherDataResponse),
        });
    }
};

export const removeWeatherDataFirebase = async (id: number): Promise<void> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    const weatherDataRef = db.collection('weatherData').doc(userId);
    const document = await weatherDataRef.get();
    const weatherDataArray = document.get('weatherData');
  
    const updatedData = weatherDataArray.filter(
      (data: any) => data.id !== id
    );
  
    await weatherDataRef.update({ weatherData: updatedData });
};

export const toggleFavoritePlaceFirebase = (id: number, isFavorite: boolean) => {
    // Find the document with the given userId in the weatherData collection
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    const weatherDataRef = db.collection('weatherData').doc(userId);

    weatherDataRef.get().then((doc) => {
    if (doc.exists) {
        const weatherData = doc.data()?.weatherData;

        // Find the object with the given id in the weatherData array and update its isFavorite property
        const updatedWeatherData = weatherData.map((data: any) => {
        if (data.id === id) {
            return { ...data, isFavorite };
        }
        return data;
        });

        // Update the weatherData object in Firestore
        weatherDataRef.update({ weatherData: updatedWeatherData }).then(() => {
            console.log('Weather data updated successfully!');
        }).catch((error) => {
            console.error('Error updating weather data: ', error);
        });
    } else {
        console.error('No such document!');
    }
    }).catch((error) => {
    console.error('Error getting document: ', error);
    });
};

export const addFavoriteWeatherDataFirebase = async (weatherData: WeatherData) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    const favoritesRef = firebase.firestore().collection('favorites').doc(userId);
  
    try {
      const document = await favoritesRef.get();
      if (document.exists) {
        // If the document exists, update the 'favorites' array with the new data
        await favoritesRef.update({
          favorites: firebase.firestore.FieldValue.arrayUnion(weatherData)
        });
      } else {
        // If the document doesn't exist, create it with the 'favorites' array containing the new data
        await favoritesRef.set({
          favorites: [weatherData]
        });
      }
    } catch (error) {
      console.error('Error adding favorite to Firebase:', error);
    }
};

export const removeFavoriteWeatherDataFirebase  = async (id: number): Promise<void> => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    const weatherDataRef = db.collection('favorites').doc(userId);
    const document = await weatherDataRef.get();
    const weatherDataArray = document.get('favorites');
  
    const updatedData = weatherDataArray.filter(
      (data: any) => data.id !== id
    );
  
    await weatherDataRef.update({ favorites: updatedData });
};