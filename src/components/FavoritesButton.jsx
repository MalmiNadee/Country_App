import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { FiHeart } from 'react-icons/fi';
import '../styles/Favorites.css';

const FavoritesButton = ({countryCode}) => {
    const { user } = useContext(AuthContext);
    const [ isFavorite, setIsFavorite ] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    //check if country is already in favorited
    useEffect(() => {
        if(user) {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
            const userFavorites = favorites[user.id] || [];
            setIsFavorite(userFavorites.includes(countryCode));
        }
    }, [user, countryCode]);

    //toggle favorite status
    const toggleFavorite = () => {
        if(!user)
            return;

        setIsAnimating(true);
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        const userFavorites = favorites[user.id] || [];

        let updatedFavorites;
        if(isFavorite) {
            updatedFavorites = userFavorites.filter( code => code !== countryCode);
        } else {
            updatedFavorites = [...userFavorites ,countryCode];
        }

        // Update localStorage
        favorites[user.id] = updatedFavorites;
        localStorage.setItem('favorites', JSON.stringify(favorites));

         // Update state immediately
        setIsFavorite(!isFavorite);
        setTimeout(() => setIsAnimating(false), 500);
    }

  return (
    <button onClick={toggleFavorite} disabled={!user}
    className={`favorite-button ${isFavorite ? 'active' : ''} ${isAnimating ? 'animate' : ''}`}
    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} >
        <FiHeart className='favorite-icon'/>
        {user && (
            <span className='fav'>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </span>
        )}
    </button>
  )
}

export default FavoritesButton;