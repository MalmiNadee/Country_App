import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

//protected route - only allow access if logged in
const AuthRoute = ({ children }) => {
    const { user, loading } = useAuth(); //get auth status
    const location = useLocation(); //current URL location

    if(loading){
        return <div className='loading-spinner'>Loading...</div>
    }

    //if user exists show the protected content
    //if not redirect to login page
    return user ? children : <Navigate to="/login" state={{ from: location }} replace/>

};

export default AuthRoute;