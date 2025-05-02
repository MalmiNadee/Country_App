import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";
import CountryCard from "../components/CountryCard";
import { ThemeContext } from "../context/ThemeContext";
import { getAllCountries, 
  getCountryByName } from "../services/api";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");

  //fetch all countries when page loads
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        //sort countries alphabetically by country common name
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  //handle search functionality
  const handleSearch = async (search) => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      //if search field empty, reset toshow all countries
      setFilteredCountries(countries);
      return;
    }

    try {
      setLoading(true);
      //try exact API search
      try {
        const data = await getCountryByName(trimmedSearch);
         // Filter results to only include exact common name or offical name
         const exactSearch = data.filter(country => {
          const CommonNameSearch = country.name.common.toLowerCase() 
          === trimmedSearch.toLowerCase();
          const OfficialNameSearch = country.name.official.toLowerCase() 
          === trimmedSearch.toLowerCase();
          return CommonNameSearch || OfficialNameSearch;
      });

        if (data.length > 0) {
          setFilteredCountries(exactSearch);
          return;
        }
      } catch (error) {
        console.log("API search failed, falling back to local", error);
      }
      // Fallback to local search if API fails
      const searchLowerCase = trimmedSearch.toLowerCase();
      const localResults = countries.filter(country => {
        // Check common name
      const CommonName = country.name.common.toLowerCase();
      // Check official name
      const OfficialName = country.name.official.toLowerCase();

      return (
        CommonName.includes(searchLowerCase) || 
        OfficialName.includes(searchLowerCase)
      );
      });
      setFilteredCountries(localResults);
    } catch (error) {
      setError(error.message);
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  };

  //handle filter functionality
  const handleFilter = async (filters) => {

    try {
      setLoading(true);
      let filteredData = [...countries];

      //filter by region
      if (filters.region !== 'All') {
        filteredData = filteredData.filter(country =>
            country.region.toLowerCase() === filters.region.toLowerCase()
         )
      }

      //filter by language
      if (filters.language !== 'All') {
        filteredData = filteredData.filter(country => {
          if(!country.languages)
            return false;
          return Object.values(country.languages).some(lang =>
            lang.toLowerCase().includes(filters.language.toLowerCase())
          )
        })
      }

      //filter by currency
      if (filters.currency !== 'All') {
        filteredData = filteredData.filter(country => {
          if(!country.currencies)
            return false;
          return Object.values(country.currencies).some(curr =>
            curr.name?.toLowerCase().includes(filters.currency.toLowerCase())
          )
        })
      }

  // Apply search filter if active
  if (searchTerm) {
    filteredData = filteredData.filter(country => {
      const countryName = country.name.common.toLowerCase();
      const countryAltNames = country.altSpellings?.map(s => s.toLowerCase()) || [];
      return (
        countryName.includes(searchTerm) ||
        countryAltNames.some(alt => alt.includes(searchTerm))
      );
    });
  }

    setFilteredCountries(filteredData);

    } catch (error) {
      setError(error.message);
      setFilteredCountries([]);
    }finally{
      setLoading(false);
    }

  };

  //loading and error states
  if (loading) return <div className="loading-spinner"> Loading... </div>;
  if (error) return <div className="error-message">Error: {error} </div>;

  return (
    <div className={`home-page ${theme}`}>
      <Header />
      <main className="container">
        <div className="controls">
        
          <div className="search-container">
             <Search onSearch={handleSearch} />
          </div>
          <div className="filters-container">
             <Filter onFilter={handleFilter} />
          </div>
        </div>

        <div className="countries-grid">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))
          ) : (
            <div className="no-results">
              <p>No Countries found</p>
              <button onClick={() => {
                setFilteredCountries(countries);
                 setSearchTerm("");
                 }}
                className="reset-button">
                Show All Countries
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
