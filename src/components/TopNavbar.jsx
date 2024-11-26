// components/TopNavbar.js
import React from 'react';
import styles from './NavbarStyles.module.css';
import gift from '../assets/gift.png';
import location from '../assets/Location.png';
import basket from '../assets/basket.png';
import down from '../assets/down.png';

const TopNavbar = () => {
  return (
    <div className={styles.topNav}>
      <div className={styles.topNavContent}>
        <div className={styles.leftContent}>
          <span><img src={gift} alt="gift" className={styles.storeLogo} /></span>
          <span className={styles.promoText}>Get 5% OFF your first order, PROMO: ORDER5</span>
          <div className={styles.location}>
            <img src={location} alt="location" className={styles.storeLogo} />
            <span>Regent Street, A4 A4201, London</span>
            <a href="#" className={styles.changeLocation}>Change Location</a>
          </div>
        </div>
        <div className={styles.cartButton}>
          <img src={basket} alt="basket" className={styles.storeLogo} />
          <span>My Cart</span>
          <span className={styles.divider}></span>
          <span><img src={down} alt="down" className={styles.storeLogo} /></span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;