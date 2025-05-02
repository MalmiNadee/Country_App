import axios from "axios";

//API service for fetch country data
const API_BASE_URL = "https://restcountries.com/v3.1";

//fetch all countries
export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all countries: ", error);
        throw error;
    }
}

//search countries by name(full/partial)
export const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching countries by name: ", error);
        throw error;
    }
}

//filter countries by region
export const getCountryByRegion = async (region) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching countries by region: ", error);
        throw error;
    }
}

//get countries by code
export const getCountryByCode = async (code) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
        return response.data[0];
    } catch (error) {
        console.error(`Error fetching countries by code ${code}: `, error);
        throw error;
    }
}

//filter countries by language
export const getCountryByLanguage = async (language) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lang/${language}`);
        return response.data[0];
    } catch (error) {
        console.error(`Error fetching countries by language ${language}: `, error);
        throw error;
    }
}

//filter countries by currency
export const getCountryByCurrency = async (currency) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/currency/${currency}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by currency ${currency}: `, error);
        throw error;
    }
}

//get countries by capital city
export const getCountryByCapitalCity = async (capital) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/capital/${capital}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching countries by capital city ${capital}: `, error);
        throw error;
    }
}