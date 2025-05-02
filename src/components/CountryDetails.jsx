import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaGlobe, FaLanguage, FaMapMarkerAlt, FaMoneyBillWave, 
  FaSpinner, FaClock, FaStar,FaFlag } from 'react-icons/fa';
import { MdLocationCity, MdPublic, MdOutlineTerrain } from 'react-icons/md';
import '../styles/Country.css';
import { GiEarthAmerica } from 'react-icons/gi';

const CountryDetails = () => {

  const { countryCode } = useParams();
  const [ country, setCountry ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [ borders, setBorders ] = useState([]);

  //fetch country data when component loads
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCountryByCode(countryCode);
        setCountry(data);

        // Set page title
        document.title = `${data.name.common} | GlobeView Explorer`;

        //fetch border countries if exist
        if(data.borders && data.borders?.length > 0) {
          const borderPromises =  data.borders.map(async (borderCode) => {
              const borderCountry = await getCountryByCode(borderCode);
              return {
                code: borderCode,
                name: borderCountry.name.common
              }
            });
          const borderNames = await Promise.all(borderPromises);
          setBorders(borderNames);
        }else {
          setBorders([]);
        }
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchCountryData();
  }, [countryCode]);

  if(loading)
    return <div className='loading-spinner'>
    <FaSpinner className='spinner-icon'/>
    <span>Loading country data...</span>
    </div>

  if(error)
    return <div className='error-message'>
     <p>Error: {error}</p>
     <Link to="/" className='back-button'>
      <IoMdArrowRoundBack/>
      <span>Back to Home</span>
     </Link>
    </div>

  if(!country)
    return <div className='not-found'>
     <p>Country not found</p>
     <Link to="/" className='back-button'>
      <IoMdArrowRoundBack/>
      <span>Back to Home</span>
     </Link>
    </div>

    const getGoogleMapUrl = () => {
      return `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`;
    }

  return (
    <div className='country-details'>
        <div className='country-header'>
      <Link to="/" className="back-button">
        <IoMdArrowRoundBack />
        <span>Back</span>
      </Link>

      <div className='country-title'>
            <h1>{country.name.common}</h1>
      </div>


      {country.coatOfArms?.png && (
            <div className='coat-of-arms'>
              <img src={country.coatOfArms.png} alt={`Coat of arms of ${country.name.common}`}/>
            </div>
          )}
        </div>

      <div className='details-container'>
         <div className='flag-container'>
             <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
             <div className="country-summary">
              <h3>Country Summary</h3>
              <div className="summary-item">
                <FaStar className="summary-icon" />
                <span>Independent Country:  {country.independent ? 'Yes' : 'No'}</span>
              </div>
             <div className="summary-item">
               <FaFlag className="summary-icon" />
              <span>UN Member Country: {country.unMember ? 'Yes' : 'No'}</span>
            </div>
            <div className="summary-item">
               <FaGlobe className="summary-icon" />
             <span>Landlocked Country: {country.landlocked ? 'Yes' : 'No'}</span>
           </div>
          <div className="summary-item">
             <FaClock className="summary-icon" />
            <span>Timezones Country : {country.timezones?.join(',') || 'N/A'}</span>
           </div>
         </div>
        </div>

         <div className='map-link-container'>
           <a href={getGoogleMapUrl()} target='_blank' rel='noopener noreferrer' className='map-link'>
            <FaMapMarkerAlt/>View on Map
           </a>
         </div>

         <div className='info-container'>
            <h2>{country.name.common}</h2>

            <div className='info-grid'>
              <div className='info-column'>

              <div className='info-item'>
                  <GiEarthAmerica className='info-icon'/>
                  <p><strong>Official Name: </strong>{country.name.official}</p>
                </div>

                <div className='info-item'>
                  <MdLocationCity className='info-icon'/>
                  <p><strong>Captial City: </strong>{country.capital?.[0] || 'N/A'}</p>
                </div>

                <div className='info-item'>
                  <MdPublic className='info-icon'/>
                  <p><strong>Region: </strong>{country.region}</p>
                </div>

                <div className='info-item'>
                  <MdOutlineTerrain  className='info-icon'/>
                  <p><strong>Sub Region: </strong>{country.subregion || 'N/A'}</p>
                </div>

                <div className='info-item'>
                  <FaGlobe  className='info-icon'/>
                  <p><strong>Population: </strong>{country.population.toLocaleString()}</p>
                </div>  
              </div>

              <div className='info-column'>

                   <div className='info-item'>
                  <FaGlobe  className='info-icon'/>
                  <p><strong>Top Level Domain: </strong>{country.tld?.[0] || 'N/A'}</p>
                  </div>  

                  <div className='info-item'>
                    <FaMoneyBillWave className='info-icon'/>
                    <p><strong>Currencies: </strong>{country.currencies? Object.values(country.currencies)
                      .map(c => c.name).join(',') : 'N/A'}</p>
                  </div>  

                  <div className='info-item'>
                    <FaLanguage className='info-icon'/>
                    <p><strong>Languages: </strong>{country.languages? Object.values(country.languages)
                      .join(',') : 'N/A'}</p>
                  </div>  

                  <div className='info-item'>
                    <FaLanguage className='info-icon'/>
                    <p><strong>Area: </strong>{country.area? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
                  </div>  
                </div>
            </div>

            {borders.length > 0 && (
              <div className='border-coutries'><strong>Border Countries</strong>
              <div className='border-buttons'>
              {borders.map(border => (
                <Link key={border.code} to={`/country/${border.code}`} className='border-button'>{border.name}</Link>
              ))}
              </div>
              </div>
            )}

           

          <div className='country-facts'>
            <div className='fact-card'>
              <h4>Driving Side</h4>
              <p>{country.car?.side || 'N/A'}</p>
            </div>
            <div className='fact-card'>
              <h4>Country Code</h4>
              <p>{country.cca2}</p>
            </div>
            <div className='fact-card'>
              <h4>Calling Code</h4>
              <p>{country.idd?.root}{country.idd?.suffixes?.[0] || 'N/A'}</p>
            </div>
            <div className='fact-card'>
              <h4>Demonym</h4>
              <p>{country.demonyms?.eng?.m || 'N/A'}</p>
            </div>
            <div className='fact-card'>
              <h4>License Plate Code</h4>
              <p>{country.car?.signs.join(', ') || 'N/A'}</p>
            </div>
          </div>
          
         </div>
      </div>
    </div>
  )
}

export default CountryDetails;