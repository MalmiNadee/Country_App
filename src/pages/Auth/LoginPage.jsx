import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import AuthForm from '../../components/AuthForm';
import ThemeToggle from './../../components/ThemeToggle';

//user login page
const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [ authError, setAuthError ] = useState(null);
  const navigate = useNavigate();

  //handle login form submission
  const handleLogin = async ( email, password) => {
    try {
      await login(email, password);
      navigate('/'); //redirect to Home Page if login success
    } catch (error) {
      setAuthError(error.message || 'Login Failed')
    }
  };

  return (
    <div className='login-page'>
       <div className='theme-toggle-container'>
       <ThemeToggle/>
       </div>
      <AuthForm
        type="login" onSubmit={handleLogin}
        onToggleType={() => navigate('/register')} //switch to register page
        error={authError || error}
      />
    </div>
  )
}

export default LoginPage;