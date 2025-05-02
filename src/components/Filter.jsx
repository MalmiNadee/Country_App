import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';

//filter component for filter countries by region, language and currency
const Filter = ({ onFilter }) => {

    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe',
       'Oceania'];
    const languages = ['All', 'English', 'Spanish', 'French', 
      'Chinese', 'Hindi','Arabic', 'Portuguese', 'Russian', 
      'German', 'Japanese'];
    const currencies = ['All', 'United States Dollar', 'Euro', 
      'Pound Sterling', 'Japanese Yen', 'Australian Dollar', 
      'Canadian Dollar', 'Yuan Renminbi', 'Indian Rupee', 
      'Russian Ruble', 'Brazilian Real'];

    //state for active filters
    const [ filters, setFilters ] = useState({
      region: 'All',
      language: 'All',
      currency: 'All',
    })

    //update filters when filter changes
    const handleFilterChange = (type, value) => {
       const newFilters = { 
        ...filters,
        [type]: value
       }
        setFilters(newFilters);
        onFilter(newFilters);
    }
    

  return (
    <div className='filters-container'>
    <div className='filters'>

      <div className='filter'>
      <label htmlFor='region' className='filter-label'>Filter by Region</label>
         <div className='filter-select'>
         
         {/* region filter */}
          <select id='region' value={filters.region} 
              onChange={(e) => handleFilterChange('region', e.target.value)}>
             {regions.map(region => (
                <option key={region} value={region}>{region}</option>
             ))}
          </select>
          <div className='select-display'>
          <span className='selected-value'>{filters.region}</span>
            <FaChevronDown className='filter-icon'/>
          </div>
      </div>
      </div>
      
       {/* language filter */}
      <div className='filter'>
      <label htmlFor='language' className='filter-label'>Filter by Language</label>
      <div className='filter-select'>
          <select id='language' value={filters.language} onChange={(e) => handleFilterChange('language', e.target.value)}>
             {languages.map(language => (
                <option key={language} value={language}>{language}</option>
             ))}
          </select>
          <div className='select-display'>
          <span className='selected-value'>{filters.language}</span>
            <FaChevronDown className='filter-icon'/>
          </div>
          </div>
      </div>

        {/* currency filter */}
      <div className='filter'>
      <label htmlFor='currency' className='filter-label'>Filter by Currency</label>
      <div className='filter-select'>
          <select id='currency' value={filters.currency} onChange={(e) => handleFilterChange('currency', e.target.value)}>
             {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
             ))}
          </select>
          <div className='select-display'>
          <span className='selected-value'>{filters.currency}</span>
            <FaChevronDown className='filter-icon'/>
          </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Filter;