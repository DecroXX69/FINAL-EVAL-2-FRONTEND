// components/MainNavbar.js
import React, { useContext } from 'react';
import styles from './NavbarStyles.module.css';
import applogo from '../assets/applogo.png';
import { AuthContext } from '../context/AuthContext';

const MainNavbar = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const handleUserProfile = () => {
    alert("user profile");
  };

  return (
    <div className={styles.mainNav}>
      <div className={styles.mainNavContent}>
        <div className={styles.logo}>
          <img src={applogo} alt="Order logo" />
        </div>
        <div className={styles.navLinks}>
          <button className={`${styles.navButton} ${styles.active}`}>Home</button>
          <button className={styles.navButton}>Browse Menu</button>
          <button className={styles.navButton}>Special Offers</button>
          <button className={styles.navButton}>Restaurants</button>
          <button className={styles.navButton}>Track Order</button>
          {isLoggedIn ? (
            <button onClick={handleUserProfile} className={styles.navButton}>Hey {user.name}</button>
          ) : (
            <button className={`${styles.navButton} ${styles.loginButton}`}>Login/Signup</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;