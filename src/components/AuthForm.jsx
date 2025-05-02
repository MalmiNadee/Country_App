import React, { useState } from 'react';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import '../styles/Auth.css';

//Form for user login/register
const AuthForm = ({ type, onSubmit, onToggleType, error}) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(type === 'login'){
            onSubmit(email, password);
        }else{
            onSubmit(email, password, name);
        }
    }

  return (
    <div className='auth-container'>
    {/* form header with dynamic title based on auth-type */}
     <div className="auth-form-header">
        <h2 className='auth-form-title'>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className='auth-form-subtitle'>{type === 'login' ? 'Sign in to continue' : 'Join us today'}</p>
      </div>

      {error && (
        <div className="auth-error-message">
          <div className="error-icon">!</div>
          <span>{error}</span>
        </div>
      )}

    <form onSubmit={handleSubmit} className='auth-form'>
         {type === 'register' && (
            <div className='form-group'>
                <FiUser  className="input-icon"/>
                <input type='text' value={name} placeholder='Name' className='auth-form-input'
                    onChange={(e) => setName(e.target.value)} required/>
            </div>
         )}

         
         <div className='form-group'>
            <FiMail  className="input-icon"/>
            <input type='email' value={email} placeholder='Email Address' className='auth-form-input'
                    onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className='form-group'>
            <FiLock  className="input-icon"/>
            <input type='password' value={password} placeholder='Password' className='auth-form-input'
                    onChange={(e) => setPassword(e.target.value)}  minLength="6" required/>
        </div>

        <button type='submit' className='auth-submit-btn'>
            {type === 'login' ? 'Login': 'Sign Up'}
        </button>
    </form>

    {/* toggle between login/register */}
    <div className='auth-form-footer'>
        <p className='auth-form-footer-text'>
            {type === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button type='button' onClick={onToggleType} className='auth-toggle-btn'>
                {type === 'login' ? "Register" : "Login" } 
            </button>
        </p>
    </div>
    </div>
  )
}

export default AuthForm;