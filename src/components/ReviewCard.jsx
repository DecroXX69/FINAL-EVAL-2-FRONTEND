// ReviewCard.jsx
import React from 'react';
import styles from './ReviewCard.module.css';
import StarIcon from '../assets/review.png';
import ClockIcon from '../assets/Time Span.png';

const ReviewCard = ({ review }) => {
  if (!review) {
    return null;
  }

  // Format the date string properly
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewCardTop}>
        <div className={styles.reviewProfile}>
          <img 
            src={review.userImage} 
            alt={review.userName || 'User'} 
            className={styles.reviewProfileImage}
            onError={(e) => {
              e.target.src = 'fallback-image-url.jpg'; // Add a fallback image URL
            }}
          />
          <div className={styles.reviewProfileInfo}>
            <h3 className={styles.reviewName}>{review.userName || 'Anonymous'}</h3>
            <p className={styles.reviewLocation}>{review.userLocation || 'Unknown Location'}</p>
          </div>
        </div>
        <div className={styles.reviewRating}>
          <img src={StarIcon} alt={`${review.rating || 0}-star rating`} className={styles.reviewRatingIcon} />
          <div className={styles.reviewDate}>
            <img src={ClockIcon} alt="Date" className={styles.reviewDateIcon} />
            <span className={styles.reviewDateText}>{formatDate(review.date)}</span>
          </div>
        </div>
      </div>
      <p className={styles.reviewText}>{review.review || 'No review text available'}</p>
    </div>
  );
};

export default ReviewCard;