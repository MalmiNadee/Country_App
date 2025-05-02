import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import './styles/App.css';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Favorites from './pages/Favorites';
import AuthRoute from './auth/AuthRoute';
import Profile from './pages/Profile';
import { AuthProvider } from './auth/AuthContext';

function App() {

  return (
  <AuthProvider>
   <ThemeProvider>
      <Router>
        <div className='App'>

          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/country/:countryCode' element={<CountryPage/>}/>

              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>

              <Route path='/favorites' 
              element={<AuthRoute><Favorites/></AuthRoute>}/>

              <Route path='/profile' 
              element={<AuthRoute><Profile/></AuthRoute>}/>
          </Routes>

        </div>
      </Router>
   </ThemeProvider>
  </AuthProvider>    
  )
}

export default App;
