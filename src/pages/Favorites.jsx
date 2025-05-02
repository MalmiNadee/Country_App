import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { getCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';
import { FiHeart, FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Favorites.css';

const Favorites = () => {

    const { user } = useContext(AuthContext);  //get current user from auth context
    const [ favoriteCountries, setFavoriteCountries] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if(!user){
            setLoading(false);
            return;
        }
        
        const fetchFavorites = async () => {
                try {        
                    //get favourites form localStorage 
                    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
                    const userFavorites = favorites[user.id] || [];
                   
                    if(userFavorites.length === 0){
                        setFavoriteCountries([]);
                        setLoading(false);
                        return;
                    }

                    //display last added first
                    const latestFavorites = [...userFavorites].reverse();
                    // Fetch updated favorites
                    const countriesPromises = latestFavorites.map(code => getCountryByCode(code));
                    const countries = await Promise.all(countriesPromises);

                    // Filter out null responses
                    setFavoriteCountries(countries.filter(Boolean));
             } catch (error) {
                    console.log("Failed to fetch favorites: ",error);
                    setError("Failed to Load Favorite Countries. Please try again.");
                }finally{
                    setLoading(false);
                }
            };
            //handle storage changes in localStorage
            const handleStorageChange = () => {
                fetchFavorites();
        }
        // listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
        
        // Initial fetch
        fetchFavorites();

    // Cleanup function - stop listen when remove event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

}, [user]);

    if(!user) {
        return (
    <div className='favorites-page'>
      <Header/>
       <div className="empty-state">
           <FiHeart className="no-favorites-icon"/>
       <p className="no-favorites-text">
         Please Login to View Favorites
       </p>
       <a href='/login' className="no-favorites-link"> 
         Go to Login<FiArrowRight className="inline"/></a>
    </div>
    </div>
  )
    }

   if(loading){
    return <div className='loading-spinner'>Loading...</div>
   }

   if(error){
    return <div className='error-message'>Error: {error}</div>
   }

  return (
    <div className='favorites-page'>
     <Header/>
    <div className="favorites-container">
      <h1 className='favorites-title'>Favourite Countries</h1>
    
      {favoriteCountries.length > 0 ? (
        <div className='favorites-grid'>
            {favoriteCountries.map(country => (
                <CountryCard key={country.cca3} country={country}/>
            ))}
        </div>
      ): (
          <div className="empty-state">
              <FiHeart className="no-favorites-icon"/>
          <p className="no-favorites-text">
           You Haven't add any favorites yet...
           </p>
           <Link to='/' className="no-favorites-link"> 
            Browse Countries<FiArrowRight className="inline"/></Link>
        </div>
      )
      }
    </div>
    </div>
       
    );
};
export default Favorites;