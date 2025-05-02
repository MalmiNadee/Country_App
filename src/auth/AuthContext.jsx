import React, { createContext, useEffect, useState, useContext } from 'react'
import { authService } from './AuthService';

//create context to manage user authentication across the app
export const AuthContext = createContext();

//provider component wrap the parts of app that need login info
export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null); //current login user
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // initialize user from localStroage if available
    useEffect(() => {
            const storedUser = localStorage.getItem('user');
            if(storedUser){
                setUser(JSON.parse(storedUser));  //use saved user data
        }
        setLoading(false);
    }, []);

  //handle user login functionality 
  const login = async (email, password) => {
    try {
        setLoading(true);
        const response = await authService.login(email, password);
        setUser(response.user);  //save user data
        localStorage.setItem('user', JSON.stringify(response.user)); //store in localStorage
        setError(null);
        return response;
    } catch (error) {
        setError(error.message);  //show error if login fails
        throw error;
    }finally{
        setLoading(false);
    }
  };

  //handle user register functionality 
  const register = async (email, password, name) => {
    try {
        setLoading(true);
        const response = await authService.register(email, password, name);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        setError(null);
        return response;
    } catch (error) {
        setError(error.message);
        throw error;
    }finally{
        setLoading(false);
    }
  };

  //handle user logout functionality 
  const logout = async () => {
    try {
        setLoading(true);
        await authService.logout();
        setUser(null); //remove user info
        localStorage.removeItem('user'); //clear user from storage
        localStorage.removeItem('favorites'); //clear favorites after logout
        setError(null);
    } catch (error) {
        setError(error.message);
        throw error;
    }finally{
        setLoading(false);
    }
  };


  //provide all these values to child components
  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

//custome hook for easy access to AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};