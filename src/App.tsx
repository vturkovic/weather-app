import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import authService from './services/auth/authService';
import './styles/app.css';
import LoginComponent from './components/loginComponent/loginComponent';
import WeatherComponent from './components/weatherComponent/weatherComponent';
import NavbarComponent from './components/navbarComponent/navbarComponent';
import FavoritesComponent from './components/favoritesComponent/favoritesComponent';
import WeatherPlaceComponent from './components/weatherComponent/weatherPlaceComponent/weatherPlaceComponent';
import WeatherDayComponent from './components/weatherComponent/weatherDayTableComponent/weatherDayTableComponent';
import { RootState } from './redux/store';

/* Dummy User
user: abc@gmail.com
pass: Asdfghjk! */

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.isAuthenticated(dispatch);
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated && <NavbarComponent />}
      {isAuthenticated ? (
        <Routes>
          <Route path="/weather" element={<WeatherComponent />} />
          <Route path="weather/:place" element={<WeatherPlaceComponent />} />
          <Route path="weather/:place/:day" element={<WeatherDayComponent />} />
          <Route path="/favorites" element={<FavoritesComponent />} />
          <Route path="/favorites/:place" element={<WeatherPlaceComponent />} />
          <Route path="/favorites/:place/:day" element={<WeatherDayComponent />} />
          <Route path="*" element={<Navigate to="/weather" />} /> 
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;