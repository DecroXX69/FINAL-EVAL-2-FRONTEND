import React from 'react';
import styles from './FoodSection.module.css';
import addToCartIcon from '../assets/Plus.png';
const FoodSection = ({ title, items, onAddToCart, addToCartIcon, isOrange }) => {
  return (
    <div className={styles.section}>
      <div className={`${styles.sectionTitle} ${isOrange ? styles.orange : ''}`}>
        {title}
      </div>
      <div className={styles.foodItemGrid}>
        {items.map((item) => (
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
                onClick={() => onAddToCart(item)}
              >
                <img src={addToCartIcon} alt="Add to Cart" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSection;