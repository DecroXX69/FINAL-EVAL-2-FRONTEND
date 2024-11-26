import React from 'react';
import styles from './NavbarStyles.module.css';
import mcd from '../assets/mcd.png';
import papa from '../assets/papa.png';
import kfc from '../assets/kfc.png';
import texas from '../assets/texas.png';
import king from '../assets/king.png';
import shawarma from '../assets/shawarma.png';

const RestaurantsSection = () => {
  const restaurants = [
    { logo: mcd },
    { logo: papa },
    { logo: kfc },
    { logo: texas },
    { logo: king },
    { logo: shawarma }
  ];

  const handleRestaurantClick = (restaurant) => {
    console.log(`Clicked on restaurant`);
  };

  return (
    <div className={styles.restaurantsSection}>
      <h2>Popular Restaurants</h2>
      <div className={styles.restaurantsGrid}>
        {restaurants.map((restaurant, index) => (
          <div 
            key={index} 
            className={styles.restaurantCard}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <img src={restaurant.logo} alt="Restaurant logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsSection;