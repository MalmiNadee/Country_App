import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {FaTimes, FaBars, FaHome, FaHeart, FaUser} from 'react-icons/fa'
import '../styles/Header.css';

const Header = () => {
    const { theme } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    //handler for user logout
    const handleLogout = async () => {
      await logout();
      navigate('/login');
      setMobileMenuOpen(false);
    }

    //close mobile menu
    const closeMobileMenu = () => {
      setMobileMenuOpen(false);
    }

  return (
    <header className={`header ${theme}`}>
        <div className='header-container'>
          <Link to="/" className='header-logo'>GlobeView</Link>

           {/* Mobile menu */}
          <div className="header-right-elements">
          <div className='mobile-menu-toggle' aria-label='Toggle theme'
                  onClick={(e) => e.stopPropagation()}>
                  <ThemeToggle/>
          </div>

          <button className='mobile-menu-button' aria-label='Toggle menu'
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
          </button>
          </div>


          {/* Navigation links - show for logged users */}
          <div className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
            {/* Mobile menu content */}
            {user && (
              <div className='header-nav-links'>
                <Link to='/' className='header-link' onClick={closeMobileMenu}>
                  <FaHome className="nav-icon" /> Home
                </Link>
                <Link to='/favorites' className='header-link' onClick={closeMobileMenu}>
                  <FaHeart className="nav-icon" /> Favorites
                </Link>
                <Link to='/profile' className='header-link' onClick={closeMobileMenu}>
                  <FaUser className="nav-icon" /> Profile
                </Link>
              </div>
            )}

            {/* Login/Register and Logout buttons */}
            <div className="header-auth-section">
              <div className="header-auth-buttons">
                {user ? (
                  <button onClick={handleLogout} className='header-button logout-button'>
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className='header-button login-button' onClick={closeMobileMenu}>
                      Login
                    </Link>
                    <Link to="/register" className='header-button register-button' onClick={closeMobileMenu}>
                      Register
                    </Link>
                  </>
                )}
                
              </div>
            
            </div>
            <ThemeToggle/>
          </div>
        </div>
    </header>
  )
}

export default Header;