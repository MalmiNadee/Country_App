import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FiArrowRight, FiUser } from 'react-icons/fi';
import '../styles/Profile.css';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

  return (
    <div className='profile-container'>
    <Header/>
    <div className='profile-card-container'>
        <div className='profile-card'>

           <div className='profile-header'>
              <div className='profile-avatar'>
                <FiUser className='profile-avatar-icon'/>
                </div>
                <h1 className='profile-title'>Your Profile</h1>
            </div>

            <div className='profile-info'>
            <div className='profile-info-container'>
              <div className='profile-fields'>
                 <label className='profile-field-label'>Full Name</label>
                 <div className='profile-field-value'>{user.name}</div>
               </div>

               <div className='profile-fields'>
                 <label className='profile-field-label'>Email Address</label>
                 <div className='profile-field-value'>{user.email}</div>
             </div>
            </div>

            <button onClick={handleLogout} className='profile-logout-btn'>
            Logout
            </button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;