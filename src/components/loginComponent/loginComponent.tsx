import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from './loginFormComponent/loginFormComponent';
import authService from '../../services/auth/authService';
import { LoginErrorType } from '../../interfaces/interfaces';

const LoginComponent = ({ onLogin }: any) => {
  const [loginError, setLoginError] = useState<LoginErrorType | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const error = await authService.login(email, password);
    if (error === '') {
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        setLoginError(null);
        navigate('/weather');
        onLogin();
      } else {
        setLoginError('Authentication error. Please try again.');
      }
    } else {
      setLoginError(error);
    }
  };

  return (
    <div className="loginComponent">
      <div className="form-container">
        <LoginFormComponent onLogin={handleLogin} loginError={loginError} />
      </div>
    </div>
  );
};

export default LoginComponent;