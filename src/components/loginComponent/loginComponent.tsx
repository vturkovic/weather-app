/* import React, { useState } from 'react';

interface Props {
  onLogin: (email: string, password: string) => Promise<void>;
}

function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm; */

import React, { useState } from 'react';
import { FormInterface, LoginInterface } from '../../interfaces';


const FormComponent = ({ onLogin }: LoginInterface) => {

  const initalFormState: FormInterface = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState<FormInterface>(initalFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //alert(JSON.stringify(formData, null, 2));
    setFormData(initalFormState);
    await onLogin(formData.email, formData.password);
    setErrors({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    validateField(name, value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const validetePasswordUppercase = (password: string) => {
    const regex = /^(?=.*[A-Z])/;
    return regex.test(password);
  };

  const validetePasswordSpecial = (password: string) => {
    const regex = /^(?=.*[@$!%*?&])/;
    return regex.test(password);
  }

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
  
    switch (fieldName) {
      case "email":
        errorMessage = value === "" ? "Required" : "";
        if (!validateEmail(value)) {
          errorMessage = "Invalid email";
        }
        break;
      case "password":
        errorMessage = value.length < 7 ? "At least 8 characters long!": "";
        if (!validetePasswordUppercase(value)) {
          errorMessage = "At least 1 uppercase character!";
        } 
        if (!validetePasswordSpecial(value)) {
          errorMessage = "At least 1 special character!";
        } 
        break;
      default:
        break;
    }
  
    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: errorMessage,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <div>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className={errors.email ? 'danger': ''} />
            {errors.email && (<div className='error-message'>{errors.email}</div>)}
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'danger': ''} />
          {errors.name && (<div className='error-message'>{errors.password}</div>)}
        </div>
        <button type="submit" disabled={Object.values(formData).some(x => !x)}>
          Log in
        </button>
      </form>
    );
  };
  
export default FormComponent;