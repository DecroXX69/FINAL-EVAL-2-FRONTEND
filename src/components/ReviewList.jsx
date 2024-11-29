import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';
import RatingIcon from '../assets/rating.png';
import NextIcon from '../assets/next.png';
import PrevIcon from '../assets/prev.png';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Show loading state
  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  // Show message if no reviews
  if (reviews.length === 0) {
    return <div>No reviews available.</div>;
  }

  // Determine the range of reviews to display
  const totalReviews = reviews.length;
  const numReviewsToDisplay = 3;
  const startIndex = currentIndex;
  const endIndex = Math.min(currentIndex + numReviewsToDisplay, totalReviews);
  const reviewsToDisplay = reviews.slice(startIndex, endIndex);

  return (
    <div className={styles.reviewList}>
      <div className={styles.reviewListHeader}>
        <h2 className={styles.reviewListTitle}>Customer Reviews</h2>
        <div className={styles.reviewListNavigation}>
          <button
            className={styles.reviewListNavBtn}
            onClick={handlePrevClick}
            disabled={totalReviews <= numReviewsToDisplay}
          >
            <img src={PrevIcon} alt="Previous" />
          </button>
          <button
            className={styles.reviewListNavBtn}
            onClick={handleNextClick}
            disabled={totalReviews <= numReviewsToDisplay}
          >
            <img src={NextIcon} alt="Next" />
          </button>
        </div>
      </div>
      <div className={styles.reviewListContent}>
        {reviewsToDisplay.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <div className={styles.reviewListRating}>
        <img src={RatingIcon} alt="3.4 Rating" className={styles.reviewListRatingIcon} />
      </div>
    </div>
  );
};

export default ReviewList;