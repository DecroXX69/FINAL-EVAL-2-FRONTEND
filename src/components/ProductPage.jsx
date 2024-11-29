// ProductPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import styles from './ProductPage.module.css';
import DeliveryInfo from './DeliveryInfo';
import RestaurantMap from './RestaurantMap';
import ReviewList from './ReviewList';
import RestaurantsSection from './RestaurantsSection';
import Footer  from './footer';
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
import addToCartIcon from '../assets/add-to-cart-icon.png';

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
      const token = localStorage.getItem('token');
    
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
    
      try {
        const response = await fetch('http://localhost:5000/api/food-items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching food items:', errorText);
          return;
        }
    
        const foodItems = await response.json();
        console.log('Food Items:', foodItems);
        setFoodItems(foodItems);
      } catch (error) {
        console.error('Fetch error:', error);
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

         {/* Burgers */}
      <div className={styles.sectionTitle}>Burgers</div>
      <div className={styles.foodItemGrid}>
        {foodItems.filter(item => item.category === 'Burgers').map((item) => (
          <div key={item._id} className={styles.foodItemCard}>
            <div className={styles.foodItemInfo}>
              <h3 className={styles.foodItemTitle}>{item.name}</h3>
              <p className={styles.foodItemDescription}>{item.description}</p>
              <p className={styles.foodItemPrice}>₹ {item.price.toFixed(2)}</p>
            </div>
            <div className={styles.foodItemImageWrapper}>
              <img src={item.image} alt={item.name} className={styles.foodItemImage} />
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(item)}
              >
                <img src={addToCartIcon} alt="Add to Cart" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fries */}
      <div className={styles.sectionTitle} style={{ color: '#FF9900' }}>Fries</div>
      <div className={styles.foodItemGrid}>
        {foodItems.filter(item => item.category === 'Fries').map((item) => (
          <div key={item._id} className={styles.foodItemCard}>
            <div className={styles.foodItemInfo}>
              <h3 className={styles.foodItemTitle}>{item.name}</h3>
              <p className={styles.foodItemDescription}>{item.description}</p>
              <p className={styles.foodItemPrice}>₹{item.price.toFixed(2)}</p>
            </div>
            <div className={styles.foodItemImageWrapper}>
              <img src={item.image} alt={item.name} className={styles.foodItemImage} />
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(item)}
              >
                <img src={addToCartIcon} alt="Add to Cart" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cold Drinks */}
      <div className={styles.sectionTitle} style={{ color: '#FF9900' }}>Cold Drinks</div>
      <div className={styles.foodItemGrid}>
        {foodItems.filter(item => item.category === 'Cold Drinks').map((item) => (
          <div key={item._id} className={styles.foodItemCard}>
            <div className={styles.foodItemInfo}>
              <h3 className={styles.foodItemTitle}>{item.name}</h3>
              <p className={styles.foodItemDescription}>{item.description}</p>
              <p className={styles.foodItemPrice}>₹ {item.price.toFixed(2)}</p>
            </div>
            <div className={styles.foodItemImageWrapper}>
              <img src={item.image} alt={item.name} className={styles.foodItemImage} />
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(item)}
              >
                <img src={addToCartIcon} alt="Add to Cart" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeliveryInfo />

      <RestaurantMap />
      <ReviewList />
      <RestaurantsSection />
      <Footer />
    </div>
  );
};

export default ProductPage;