import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/loginComponent/loginComponent';
import WeatherComponent from './components/weatherComponent/weatherComponent';
import './styles/app.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  /* Dummy User
    user: abc@gmail.com
    pass: Asdfghjk!
  */

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent onLogin={handleLogin}/>} />
        <Route path="/weather" element={<WeatherComponent />} />
        {/* <Route path="/weather" element={isAuthenticated ? <WeatherComponent /> : <Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;