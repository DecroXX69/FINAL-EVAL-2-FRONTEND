import React, { useEffect, useState } from 'react';
import styles from './DeliveryInfo.module.css';
import { Clock, MapPin, Phone } from 'lucide-react';

const DeliveryInfo = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const restaurant = JSON.parse(localStorage.getItem('selectedRestaurant'));
    setSelectedRestaurant(restaurant);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.title}>
            <MapPin className={styles.icon} />
            Delivery Information
          </h2>
          <div className={styles.timeList}>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Monday:</b></span>
              <span>12:00 AM-3:00 AM, 8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Tuesday:</b></span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Wednesday:</b></span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Thursday:</b></span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates} ><b>Friday:</b></span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Saturday:</b></span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Sunday:</b></span>
              <span>8:00 AM-12:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates}><b>Estimated time until delivery:</b></span>
              <span>20 min</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.title}>
            <Phone className={styles.icon} />
            Contact Information
          </h2>
          <p className={styles.allergyInfo}>
            If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.
          </p>
          <h3 className={styles.subtitle}>Phone number</h3>
          <p className={styles.contactDetail}>+934443-43</p>
          <h3 className={styles.subtitle}>Website</h3>
          <p className={styles.contactDetail}>
            {selectedRestaurant?.website || 'http://mcdonalds.uk/'}
          </p>
        </div>

        <div className={styles.darkSection}>
          <h2 className={styles.whiteTitle}>
            <Clock className={styles.icon} />
            Operational Times
          </h2>
          <div className={styles.timeList}>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Monday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Tuesday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Wednesday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Thursday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Friday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Saturday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
            <div className={styles.timeItem}>
              <span className={styles.Dates2}><b>Sunday</b>:</span>
              <span>8:00 AM-3:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;