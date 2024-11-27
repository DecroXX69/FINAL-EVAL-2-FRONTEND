// ProductPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import styles from './ProductPage.module.css';

// Import your assets
import orderIcon from '../assets/order-icon.png';
import deliveryIcon from '../assets/delivery-icon.png';
import clockIcon from '../assets/clock-icon.png';
import searchIcon from '../assets/search-icon.png';
import ratingImage from '../assets/rating.png';
import offer1 from '../assets/offer1.png';
import offer2 from '../assets/offer2.png';
import offer3 from '../assets/offer3.png';
import burgerimg from '../assets/burgerimg.png';

const ProductPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRestaurant = localStorage.getItem('selectedRestaurant');
    if (!storedRestaurant) {
      navigate('/');
      return;
    }
    setSelectedRestaurant(JSON.parse(storedRestaurant));

    const fetchFoodItems = async () => {
      try {
        const response = await fetch('/api/food-items', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, [navigate]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  if (!selectedRestaurant) {
    return null;
  }

  return (
    <div className={styles.productPage}>
      <TopNavbar />
      <MainNavbar />

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.restaurantInfo}>
            <p className={styles.slogan}>{selectedRestaurant.slogan}</p>
            <h1 className={styles.restaurantName}>{selectedRestaurant.name}</h1>

            <div className={styles.infoBoxes}>
              <div className={styles.infoBox}>
                <img src={orderIcon} alt="Minimum order" />
                <span>Minimum Order: 12 GBP</span>
              </div>
              <div className={styles.infoBox}>
                <img src={deliveryIcon} alt="Delivery time" />
                <span>Delivery in 20-25 Minutes</span>
              </div>
            </div>

            <div className={styles.openingHours}>
              <img src={clockIcon} alt="Clock" />
              <span>Open until 3:00 AM</span>
            </div>
          </div>

          <div className={styles.restaurantPreview}>
            <img src={burgerimg} alt="Restaurant preview" className={styles.previewImage} />
            <img src={ratingImage} alt="Rating" className={styles.ratingImage} />
          </div>
        </div>
      </div>

      <div className={styles.menuSection}>
        <div className={styles.menuHeader}>
          <h2>All Offers from {selectedRestaurant.name}</h2>
          <div className={styles.searchBar}>
            <img src={searchIcon} alt="Search" />
            <input type="text" placeholder="Search from menu..." />
          </div>
        </div>

        <nav className={styles.menuNav}>
          <ul>
            <li className={styles.active}>Offers</li>
            <li>Burgers</li>
            <li>Fries</li>
            <li>Snacks</li>
            <li>Salads</li>
            <li>Cold drinks</li>
            <li>Happy Meal®</li>
            <li>Desserts</li>
            <li>Hot drinks</li>
            <li>Sauces</li>
            <li>Orbit®</li>
          </ul>
        </nav>

        <div className={styles.offersGrid}>
          <img src={offer1} alt="Offer 1" />
          <img src={offer2} alt="Offer 2" />
          <img src={offer3} alt="Offer 3" />
        </div>
        
      </div>

      {foodItems.map((category) => (
        <div key={category._id} className={styles.categorySection}>
          <h2 className={category.category === 'Burgers' ? styles.categoryTitleBlack : styles.categoryTitleOrange}>
            {category.category}
          </h2>
          <div className={styles.foodItemGrid}>
            {category.items.map((item) => (
              <div key={item._id} className={styles.foodItemCard}>
                <div className={styles.foodItemInfo}>
                  <h3 className={styles.foodItemTitle}>{item.name}</h3>
                  <p className={styles.foodItemDescription}>{item.description}</p>
                  <p className={styles.foodItemPrice}>${item.price.toFixed(2)}</p>
                </div>
                <div className={styles.foodItemImageWrapper}>
                  <img src={item.image} alt={item.name} className={styles.foodItemImage} />
                  <button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className={styles.cartSection}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <ul className={styles.cartItems}>
            {cart.map((item, index) => (
              <li key={index} className={styles.cartItem}>
                <div className={styles.cartItemInfo}>
                  <h3 className={styles.cartItemTitle}>{item.name}</h3>
                  <p className={styles.cartItemDescription}>{item.description}</p>
                </div>
                <p className={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
