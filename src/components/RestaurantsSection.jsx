import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavbarStyles.module.css';
import mcd from '../assets/mcd.png';
import papa from '../assets/papa.png';
import kfc from '../assets/kfc.png';
import texas from '../assets/texas.png';
import king from '../assets/king.png';
import shawarma from '../assets/shawarma.png';

const RestaurantsSection = ({ title = "Popular Restaurants" }) => {
  const navigate = useNavigate();

  const restaurants = [
    { logo: mcd, id: 'mcdonalds', name: "McDonald's East London", slogan: "I'm lovin' it!" },
    { logo: papa, id: 'papa', name: "Papa Johns", slogan: "Better Ingredients. Better Pizza." },
    { logo: kfc, id: 'kfc', name: "KFC West London", slogan: "Finger Lickin' Good" },
    { logo: texas, id: 'texas', name: "Texas Chicken", slogan: "Bold Texas Flavor" },
    { logo: king, id: 'king', name: "Burger King", slogan: "Have It Your Way" },
    { logo: shawarma, id: 'shawarma', name: "Shawarma 1", slogan: "Authentic Middle Eastern Taste" }
  ];

  const handleRestaurantClick = (restaurant) => {
    localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
    navigate('/product');
  };

  return (
    <div className={styles.restaurantsSection}>
      <h2>{title}</h2>
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