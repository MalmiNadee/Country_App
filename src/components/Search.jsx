import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

//search component to search country by name 
const Search = ({ onSearch }) => {

    const [ search, setSearch ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search.trim() === '') // Prevent empty submissions
          return;
        onSearch(search.trim())
    };

  return (
    <form className='search' onSubmit={handleSubmit}>
    
          <input type="text" placeholder='Search for a country...'
            value={search} 
            onChange={(e) => setSearch(e.target.value)} />
            
          <button type='submit'>
           <FaSearch/>
          </button>
    </form>
  )
}

export default Search;