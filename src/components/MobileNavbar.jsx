// MobileNavbar.jsx
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MobileNavbar.module.css';
import storeLogo from '../assets/applogo.png';

import userImage from '../assets/user.png';
import cartIcon from '../assets/basket.png';
import locationIcon from '../assets/Location.png';
import { AuthContext } from '../context/AuthContext';

const MobileNavbar = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserProfile = () => {
    navigate('/profile');
  };

  const handleCartToggle = () => {
    navigate('/cart');
  };

  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <img src={storeLogo} alt="Store Logo" />
        </div>
        <div className={styles.menuButton}>
          
        </div>
      </div>
      <div className={styles.secondNav}>
        <div className={styles.userInfo}>
          <img src={userImage} alt="User" />
          <span>Hey {user.user.name}</span>
        </div>
        <div className={styles.cartInfo} onClick={handleCartToggle}>
          <img src={cartIcon} alt="Cart" />
          <span>My Cart</span>
        </div>
      </div>
      <div className={styles.locationInfo}>
        <img src={locationIcon} alt="Location" />
        <span>Lution Street, N4G-00....</span>
      </div>
    </div>
  );
};

export default MobileNavbar;