import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import styles from './ProductPage.module.css';
import FoodSection from './FoodSection'
import DeliveryInfo from './DeliveryInfo';
import RestaurantMap from './RestaurantMap';
import ReviewList from './ReviewList';
import RestaurantsSection from './RestaurantsSection';
import Footer from './footer';
import Cart from './Cart';

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
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const {
    cart: contextCart,
    addToCart: contextAddToCart,
    removeFromCart: contextRemoveFromCart,
    updateQuantity: contextUpdateQuantity
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Initial setup effect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');
    
    const storedRestaurant = localStorage.getItem('selectedRestaurant');
    if (!storedRestaurant && !restaurantId) {
      navigate('/');
      return;
    }

    const currentRestaurant = JSON.parse(storedRestaurant);
    setSelectedRestaurant(currentRestaurant);

    const fetchFoodItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/food-items`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching food items:', errorText);
          return;
        }

        const foodItems = await response.json();
        setFoodItems(foodItems);
        setFilteredFoodItems(foodItems); // Initialize filtered items with all items
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFoodItems();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, [navigate]);

  // Search effect
  useEffect(() => {
    const filtered = foodItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoodItems(filtered);
  }, [searchQuery, foodItems]);

  // Cart visibility effect
  useEffect(() => {
    setIsCartVisible(cart.length > 0);
  }, [cart]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRestaurantUpdate = (newRestaurant) => {
    setSelectedRestaurant(newRestaurant);
    localStorage.setItem('selectedRestaurant', JSON.stringify(newRestaurant));
    setCart([]);
    setIsCartVisible(false);
  };

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    contextAddToCart(item);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
    contextRemoveFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    contextUpdateQuantity(itemId, newQuantity);
  };

  const handleCartToggle = () => {
    if (cart.length > 0) {
      setIsCartVisible(!isCartVisible);
    } else {
      alert("Add items to your cart first!");
    }
  };

  const getFilteredItemsByCategory = (category) => {
    return filteredFoodItems.filter(item => item.category === category);
  };

  if (!selectedRestaurant) {
    return null;
  }

  return (
    <div className={styles.productPage}>
      <TopNavbar onCartToggle={handleCartToggle} />
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
            <input 
              type="text" 
              placeholder="Search from menu..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
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
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {
            <div className={`${styles.offersGrid} ${cart.length > 0 ? styles.withCart : ''}`}>
              <img src={offer1} alt="Offer 1" />
              <img src={offer2} alt="Offer 2" />
              <img src={offer3} alt="Offer 3" />
            </div>
}

          <div className={`${styles.foodSectionsWrapper} ${cart.length > 0 ? styles.withCart : ''}`}>
            {getFilteredItemsByCategory('Burgers').length > 0 && (
              <FoodSection
                title="Burgers"
                items={getFilteredItemsByCategory('Burgers')}
                onAddToCart={handleAddToCart}
                addToCartIcon={addToCartIcon}
              />
            )}

            {getFilteredItemsByCategory('Fries').length > 0 && (
              <FoodSection
                title="Fries"
                items={getFilteredItemsByCategory('Fries')}
                onAddToCart={handleAddToCart}
                addToCartIcon={addToCartIcon}
              />
            )}

            {getFilteredItemsByCategory('Cold Drinks').length > 0 && (
              <FoodSection
                title="Cold Drinks"
                items={getFilteredItemsByCategory('Cold Drinks')}
                onAddToCart={handleAddToCart}
                addToCartIcon={addToCartIcon}
              />
            )}

            {filteredFoodItems.length === 0 && searchQuery && (
              <div className={styles.noResults}>
                <p>No items found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {isCartVisible && (
          <Cart
            items={cart}
            removeFromCart={handleRemoveFromCart}
            updateQuantity={handleUpdateQuantity}
          />
        )}
      </div>

      {!isMobile && <DeliveryInfo />}
      <RestaurantMap />
      <ReviewList />
      <RestaurantsSection
        onRestaurantSelect={handleRestaurantUpdate}
        currentRestaurantId={selectedRestaurant?.id}
      />
      <Footer />
    </div>
  );
};

export default ProductPage;