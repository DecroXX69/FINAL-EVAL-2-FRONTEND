import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import { Share2 } from 'lucide-react';
import down2 from '../assets/Down2.png';
import side from '../assets/side.png';
import Store from '../assets/Store.png';
import Delivery from '../assets/Delivery.png';
import Remove from '../assets/Remove.png';
import basket from '../assets/basket.png';
import { v4 as uuidv4 } from 'uuid';

const Cart = ({ items, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();
    const subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = -23.00;
    const deliveryFee = 3.00;
    const total = subTotal + discount + deliveryFee;

    const handleCheckout = () => {
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
            <div className={styles.shareSection}>
                <Share2 size={20} />
                <span>Share this cart with your friends</span>
                <button onClick={handleCopyLink} className={styles.copyButton}>
                    Copy Link
                </button>
            </div>

            <div className={styles.basketHeader}>
                <img src={basket} alt="Basket" className={styles.basketIcon} />
                <span>My Basket</span>
            </div>

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
                            <img src={Remove} alt="Remove" className={styles.removeIcon} />
                        </button>
                    </div>
                ))}
            </div>

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

            <div className={styles.totalBox}>
                Total to pay
                <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
            </div>

            <div className={styles.optionBox}>
                <img src={down2} alt="Gift" className={styles.optionIcon} />
                <span>Choose your free item..</span>
            </div>

            <div className={styles.optionBox}>
                <img src={side} alt="Coupon" className={styles.optionIcon} />
                <span>Apply Coupon Code here</span>
            </div>

            <div className={styles.deliveryOptions}>
                <div className={styles.deliveryOption}>
                    <img src={Delivery} alt="Delivery" className={styles.deliveryIcon} />
                    <span>Delivery</span>
                    <span className={styles.deliveryTime}>Starts at 17:50</span>
                </div>
                <div className={styles.deliveryOption}>
                    <img src={Store} alt="Collection" className={styles.deliveryIcon} />
                    <span>Collection</span>
                    <span className={styles.deliveryTime}>Starts at 17:50</span>
                </div>
            </div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
                Checkout!
            </button>
        </div>
    );
};

export default Cart;