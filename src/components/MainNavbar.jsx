import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavbarStyles.module.css';
import applogo from '../assets/applogo.png';
import { AuthContext } from '../context/AuthContext';
import defaultUserImage from '../assets/default-user-image.png';

const MainNavbar = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserProfile = () => {
    navigate('/profile');
  };

  
  const isActiveButton = (route) => {
    const nonHighlightedRoutes = [
      '/payment', 
      '/shared-cart/', 
      '/checkout', 
      '/profile'
    ];

    
    const isNonHighlightedRoute = nonHighlightedRoutes.some(r => 
      location.pathname.startsWith(r)
    );

    if (isNonHighlightedRoute) {
      return false;
    }

    
    switch (route) {
      case 'home':
        return location.pathname === '/home';
      case 'restaurants':
        return location.pathname.startsWith('/product');
      default:
        return false;
    }
  };

  return (
    <div className={styles.mainNav}>
      <div className={styles.mainNavContent}>
        <div className={styles.logo}>
          <img src={applogo} alt="Order logo" />
        </div>
        <div className={styles.navLinks}>
          <button 
            className={`${styles.navButton} ${isActiveButton('home') ? styles.active : ''}`}
            onClick={() => navigate('/home')}
          >
            Home
          </button>
          <button className={styles.navButton}>Browse Menu</button>
          <button className={styles.navButton}>Special Offers</button>
          <button 
            className={`${styles.navButton} ${isActiveButton('restaurants') ? styles.active : ''}`}
            onClick={() => navigate('/product')}
          >
            Restaurants
          </button>
          <button className={styles.navButton}>Track Order</button>
          {isLoggedIn ? (
            <button 
              onClick={handleUserProfile} 
              className={`${styles.navButton} ${styles.userProfileButton}`}
            >
              <img 
                src={user.user.profileImage || defaultUserImage} 
                alt="User profile" 
                className={styles.userProfileImage} 
              />
              Hey {user.user.name}
            </button>
          ) : (
            <button className={`${styles.navButton} ${styles.loginButton}`}>
              Login/Signup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;