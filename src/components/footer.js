import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import applogo from '../assets/applogo2.png';
import playStoreImage from '../assets/play-store.png';
import facebookIcon from '../assets/Facebook.png';
import instagramIcon from '../assets/Instagram.png';
import tiktokIcon from '../assets/TikTok.png';
import snapchatIcon from '../assets/Snapchat.png';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      
      <div className={styles.greySection}>
        <div className={styles.leftSection}>
            <img src={applogo} alt="Play Store Logo" className={styles.storeLogo} />
          <img src={playStoreImage} alt="Play Store Logo" className={styles.storeLogo} />
          <p className={styles.companyInfo}>
            Company #490039-445, Registered with House of Companies.
          </p>
        </div>
        <div className={styles.middleSection}>
          <h3 className={styles.heading}>Get Exclusive Deals in your Inbox</h3>
          <div className={styles.subscribeContainer}>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
          <p className={styles.emailPolicy}>
            We won’t spam, read our <Link to="/email-policy">email policy</Link>
          </p>
          <div className={styles.socialIcons}>
            <img src={facebookIcon} alt="Facebook" className={styles.icon} />
            <img src={instagramIcon} alt="Instagram" className={styles.icon} />
            <img src={tiktokIcon} alt="TikTok" className={styles.icon} />
            <img src={snapchatIcon} alt="Snapchat" className={styles.icon} />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.linksColumn}>
            <h4 className={styles.linkHeading}>Legal Pages</h4>
            <Link to="/terms" className={styles.link}>Terms and Conditions</Link>
            <Link to="/privacy" className={styles.link}>Privacy</Link>
            <Link to="/cookies" className={styles.link}>Cookies</Link>
            <Link to="/modern-slavery" className={styles.link}>
              Modern Slavery Statement
            </Link>
          </div>
          <div className={styles.linksColumn}>
            <h4 className={styles.linkHeading}>Important Links</h4>
            <Link to="/help" className={styles.link}>Get Help</Link>
            <Link to="/restaurant/add" className={styles.link}>Add Your Restaurant</Link>
            <Link to="/delivery/signup" className={styles.link}>Sign Up to Deliver</Link>
            <Link to="/business/account" className={styles.link}>
              Create a Business Account
            </Link>
          </div>
        </div>
      </div>
     
      <div className={styles.blueSection}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        <div className={styles.smallLinks}>
          <Link to="/privacy-policy" className={styles.blueLink}>Privacy Policy</Link>
          <Link to="/terms" className={styles.blueLink}>Terms</Link>
          <Link to="/pricing" className={styles.blueLink}>Pricing</Link>
          <Link to="/personal-information" className={styles.blueLink}>
            Do not sell or share my personal information
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
