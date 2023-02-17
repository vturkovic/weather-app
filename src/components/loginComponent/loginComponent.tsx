import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from './loginFormComponent/loginFormComponent';
import authService from '../../services/auth/authService';
import { LoginErrorType } from '../../interfaces';

const LoginComponent = ({ onLogin } : any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<LoginErrorType | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const error = await authService.login(email, password);
    if (error === '') {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        setLoggedIn(true);
        setLoginError(null);
        navigate('/weather'); // Redirect to /weather on successful login
        onLogin();
      } else {
        setLoginError('Authentication error. Please try again.');
      }
    } else {
      setLoginError(error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await authService.logout();
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // If the user is logged in, set a timeout to log them out after 20 minutes.
    if (loggedIn) {
      timeout = setTimeout(() => {
        handleLogout();
      }, 20 * 60 * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [loggedIn, handleLogout]);

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <LoginFormComponent onLogin={handleLogin} loginError={loginError} />
      )}
    </div>
  );
};

export default LoginComponent;
