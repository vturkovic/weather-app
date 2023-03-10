import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from './loginFormComponent/loginFormComponent';
import authService from '@authService';
import { LoginErrorType } from '@interfaces';

const LoginComponent = () => {
  const [loginError, setLoginError] = useState<LoginErrorType | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const error = await authService.login(email, password);
    if (error === '') {
      setLoginError(null);
      navigate('/weather');
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