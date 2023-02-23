import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import authService from './services/auth/authService';
import './styles/app.css';
import LoginComponent from './components/loginComponent/loginComponent';
import WeatherComponent from './components/weatherComponent/weatherComponent';
import NavbarComponent from './components/navbarComponent/navbarComponent';
import FavoritesComponent from './components/favoritesComponent/favoritesComponent';
import WeatherPlaceComponent from './components/weatherComponent/weatherPlaceComponent/weatherPlaceComponent';
import WeatherDayComponent from './components/weatherComponent/weatherDayComponent/weatherDayComponent';


/* Dummy User
user: abc@gmail.com
pass: Asdfghjk! */

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);

    setTimeout(() => {
      handleLogout();
    }, 20 * 60 * 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    authService.logout();
  };

  return (
    <Router>
      {isAuthenticated && <NavbarComponent onLogout={handleLogout} />}
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="/weather" element={<WeatherComponent />} />
          <Route path="weather/:place" element={<WeatherPlaceComponent />} />
          <Route path="weather/:place/:day" element={<WeatherDayComponent />} />
          <Route path="/favorites" element={<FavoritesComponent />} />
          <Route path="*" element={<Navigate to="/weather" />} /> 
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComponent onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;