import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

//Theme toggle component  for switch between light and dark theme
const ThemeToggle = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className='theme-toggle' onClick={toggleTheme} 
    aria-label={`Switch to ${theme === 'light' ?  'dark' : 'light'} mode `}>

        {theme === 'light' ? 
         <FaMoon size={20} className='toggle-icon'/> :
          <FaSun size={20} className='toggle-icon'/>
          }
          
        <span className='toggle-text'>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle;