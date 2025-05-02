import React from 'react';
import CountryDetails from '../components/CountryDetails';
import Header from '../components/Header';
import '../styles/Country.css';

//detailed country information page
const CountryPage = () => {
  return (
    <div className='country-page'>
    <Header/>
      <CountryDetails/>
    </div>
  )
}

export default CountryPage;