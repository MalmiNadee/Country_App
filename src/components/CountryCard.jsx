import React from 'react';
import { Link } from 'react-router-dom';
import FavoritesButton from './FavoritesButton';
import '../styles/Country.css';

const CountryCard = ({ country }) => {
  return (
    <div className='country-card'>
      <div className='card-header'>
        <FavoritesButton countryCode={country.cca3}/>
      <Link to={`/country/${country.cca3}`}>
        <div className='card-flag-container'>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} loading='lazy'/>
        </div>
        </Link>
      </div>
        <div className='card-body'>
           <h3>{country.name.common}</h3>
           <div className='country-info'>
           <p><strong>Population: </strong> {country.population.toLocaleString()}</p>
           <p><strong>Region: </strong> {country.region}</p>
           <p><strong>Currencies: </strong>{country.currencies? Object.values(country.currencies)
                   .map(c => c.name).join(',') : 'N/A'}</p>
            <p><strong>Languages: </strong>{country.languages? Object.values(country.languages)
                    .join(',') : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard;