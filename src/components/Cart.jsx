import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import { Share2, ShoppingBasket, X, Gift, Tag, Truck, Store } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; 

const Cart = ({ items, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();
  const subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = -23.00; // Static discount as per requirement
  const deliveryFee = 3.00; // Static delivery fee
  const total = subTotal + discount + deliveryFee;


  const handleCheckout = () => {
    // Store cart items in localStorage before navigating
    localStorage.setItem('cart', JSON.stringify(items));
    navigate('/checkout');
  };


  const handleCopyLink = async () => {
    try {
      const cartData = {
        items,
        total,
        subTotal,
        discount,
        deliveryFee
      };
  
      // Make request to backend port 5000
      const response = await fetch('http://localhost:5000/api/shared-carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!data.success) {
        throw new Error(data.message || 'Failed to create shared cart');
      }
  
      const shareableUrl = `${window.location.origin}/shared-cart/${data.cartId}`;
      await navigator.clipboard.writeText(shareableUrl);
      alert('Cart link copied to clipboard! The link will expire in 24 hours.');
    } catch (err) {
      console.error('Failed to create shared cart link:', err);
      alert(`Failed to create shared cart link: ${err.message}`);
    }
  };
  
  return (
    <div className={styles.cartContainer}>
      {/* Share Section */}
      <div className={styles.shareSection}>
        <Share2 size={20} />
        <span>Share this cart with your friends</span>
        <button onClick={handleCopyLink} className={styles.copyButton}>
          Copy Link
        </button>
      </div>

      {/* Basket Header */}
      <div className={styles.basketHeader}>
        <ShoppingBasket size={20} />
        <span>My Basket</span>
      </div>

      {/* Cart Items */}
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div key={item._id} className={styles.cartItem}>
            <div className={styles.quantityBadge}>
              {item.quantity}x
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</div>
              <div className={styles.itemName}>{item.name}</div>
              {item.description && (
                <div className={styles.itemDescription}>{item.description}</div>
              )}
            </div>
            <button 
              className={styles.removeButton}
              onClick={() => removeFromCart(item._id)}
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>Sub Total:</span>
          <span>₹{subTotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Discounts:</span>
          <span>₹{discount.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Delivery Fee:</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className={styles.totalBox}>
        Total to pay
        <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
      </div>

      {/* Static Sections */}
      <div className={styles.optionBox}>
        <span>Choose your free item..</span>
        <Gift size={20} />
      </div>

      <div className={styles.optionBox}>
        <span>Apply Coupon Code here</span>
        <Tag size={20} />
      </div>

      {/* Delivery Options */}
      <div className={styles.deliveryOptions}>
        <div className={styles.deliveryOption}>
          <Truck size={24} />
          <span>Delivery</span>
          <span className={styles.deliveryTime}>Starts at 17:50</span>
        </div>
        <div className={styles.deliveryOption}>
          <Store size={24} />
          <span>Collection</span>
          <span className={styles.deliveryTime}>Starts at 17:50</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className={styles.checkoutButton} onClick={handleCheckout}>
  Checkout!
</button>
    </div>
  );
};

export default Cart;