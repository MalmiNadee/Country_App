import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import AuthForm from '../../components/AuthForm';
import ThemeToggle from './../../components/ThemeToggle';

//user register page
const RegisterPage = () => {
  const { register, error } = useContext(AuthContext);
  const [ authError, setAuthError ] = useState(null);
  const navigate = useNavigate();

  //handle register form submission
  const handleRegister = async ( email, password, name) => {
    try {
      await register(email, password, name);
      navigate('/'); //Redirect to Home Page if register success
    } catch (error) {
      setAuthError(error.message || 'SignUp Failed')
    }
  };

  return (
    <div className='register-page'>
      <div className='theme-toggle-container'>
       <ThemeToggle/>
       </div>
      <AuthForm
        type="register" onSubmit={handleRegister}
        onToggleType={() => navigate('/login')} //switch to login page
        error={authError || error}
      />
    </div>
  )
}

export default RegisterPage;