import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import RestaurantsSection from './RestaurantsSection';
import Footer from './footer';
import styles from './CheckoutPage.module.css';
import addressIcon from '../assets/address.png'; 
import Arrow from '../assets/arrow-left.png';
import Vector from '../assets/Vector.png';

const SharedCart = () => {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shared-carts/${cartId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
      
          // Add this for debugging
          console.log('Response status:', response.status);
          console.log('Response headers:', [...response.headers.entries()]);
          
          const text = await response.text();
          console.log('Raw response:', text);
      
          try {
            const data = JSON.parse(text);
            if (data.success) {
              setCart(data.cart);
            } else {
              throw new Error(data.message || 'Failed to fetch shared cart');
            }
          } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            throw new Error('Server response was not in JSON format');
          }
        } catch (err) {
          console.error('Error fetching shared cart:', err);
          setError(err.message || 'Failed to fetch shared cart. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    if (cartId) {
      fetchCartData();
    } else {
      setError('Invalid cart ID');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [cartId, navigate]);

  const handlePaymentClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('pendingSharedCart', cartId);
      localStorage.setItem('redirectAfterAuth', `/shared-cart/${cartId}`);
      navigate('/');
      alert('Please create an account or login to proceed with payment');
    } else {
      // Save shared cart items to user's cart and proceed to payment
      localStorage.setItem('cart', JSON.stringify(cart.items));
      navigate('/payment');
    }
  };

  const handleAddressClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add delivery address');
      return;
    }
  };

  if (loading) {
    return (
      <div className={styles.checkoutPage}>
        <TopNavbar />
        <MainNavbar />
        <div className={styles.contentContainer}>
          <div className={styles.loading}>Loading shared cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.checkoutPage}>
        <TopNavbar />
        <MainNavbar />
        <div className={styles.contentContainer}>
          <div className={styles.error}>{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cart) {
    return null;
  }

  const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const salesTax = 10;
  const finalTotal = cartTotal + salesTax;

  return (
    <div className={styles.checkoutPage}>
      <TopNavbar />
      <MainNavbar />
      <div className={styles.contentContainer}>
        <div className={styles.orderHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={Arrow} alt="Back" />
          </button>
          <h1>Shared Cart Details</h1>
        </div>

        <div className={styles.orderContent}>
          <div className={styles.leftSection}>
            <div className={styles.orderItems}>
              {cart.items.map((item) => (
                <div key={item._id} className={styles.foodItem}>
                  <img src={item.image} alt={item.name} className={styles.foodImage} />
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <span className={styles.quantity}>{item.quantity}x items</span>
                  </div>
                  <span className={styles.price}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.notesSection}>
              <h4>Notes</h4>
              <input
                type="text"
                placeholder="Add order notes"
                className={styles.notesInput}
                readOnly
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.deliverySection}>
              <button 
                className={styles.addressButton} 
                onClick={handleAddressClick}
              >
                <div className={styles.addressContent}>
                  <img src={addressIcon} alt="Location" />
                  <div className={styles.addressInfo}>
                    <h3>Delivery Address</h3>
                    <p>Add address</p>
                  </div>
                </div>
                <img src={Vector} alt="Vector"  />
              </button>
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span className={styles.greyText}>Items</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.greyText}>Sales Tax</span>
                <span>₹{salesTax.toFixed(2)}</span>
              </div>
              <div className={styles.subtotalRow}>
                <span>Subtotal ({cart.items.length} items)</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className={styles.paymentButton}
              onClick={handlePaymentClick}
            >
              {localStorage.getItem('token') ? 'Choose Payment Method' : 'Login to Proceed'}
            </button>
          </div>
        </div>
      </div>
      <RestaurantsSection />
      <Footer />
    </div>
  );
};

export default SharedCart;