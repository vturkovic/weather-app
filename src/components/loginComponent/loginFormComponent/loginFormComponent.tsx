import React, { useState } from 'react';
import { FormInterface, LoginInterface } from '@interfaces';
import formValidationService from '@formValidationService';


const FormComponent = ({ onLogin, loginError }: LoginInterface) => {

  const initalFormState: FormInterface = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState<FormInterface>(initalFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onLogin(formData.email, formData.password);
    setErrors({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    let errorMessage = formValidationService.validateField(name, value);

    setErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage,
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
            {errors.password && (<div className='error-message'>{errors.password}</div>)}
          </div>
          <div className="sumbit">
            <button type="submit" disabled={Object.values(formData).some(x => !x) || Object.values(errors).some(x => x)}>
              Log in
            </button>
              {loginError && (
                <div className='login-error'>
                  {typeof loginError === 'string' ? loginError : loginError.message}
                  </div>
              )}
          </div>
      </form>
    );
  };
  
export default FormComponent;