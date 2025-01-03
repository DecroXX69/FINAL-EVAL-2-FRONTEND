import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Footer from './footer';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import RestaurantsSection from './RestaurantsSection';
import MobileNavbar from './MobileNavbar';
import applogo from '../assets/applogo.png';
import lol  from '../assets/lol.png';
import wpizza from '../assets/wpizza.png';
import wnoodle from '../assets/wnoodle.png';
import bigpic1 from '../assets/bigpic1.png';
import bigpic2 from '../assets/bigpic2.png';
import bigpic3 from '../assets/bigpic3.png';
import burger from '../assets/burger.png';
import salad from '../assets/salad.png';
import pasta from '../assets/pasta.png';
import pizza from '../assets/pizza.png';
import breakfast from '../assets/break.png';
import soup from '../assets/soup.png';
import couple from '../assets/couple.png';
import riderPartnerImage from '../assets/riderPartnerImage.png';
import businessPartnerImage from '../assets/businessPartnerImage.png';
import phone from '../assets/phone.png';
import cap from '../assets/cap.png';
import fod from '../assets/fod.png';
import Tick from '../assets/Tick.png';
import num1 from '../assets/1.png';
import num2 from '../assets/2.png';
import num3 from '../assets/3.png';
import playstore from '../assets/play-store.png';
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if viewport is mobile width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust this breakpoint
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  

  
  const categories = [
    { name: "Burgers & Fast food", restaurants: "21 Restaurants", image: burger },
    { name: "Salads", restaurants: "32 Restaurants", image: salad },
    { name: "Pasta & Casuals", restaurants: "4 Restaurants", image: pasta },
    { name: "Pizza", restaurants: "52 Restaurants", image: pizza },
    { name: "Breakfast", restaurants: "4 Restaurants", image: breakfast },
    { name: "Soups", restaurants: "32 Restaurants", image: soup }
  ];

  
 

  return (
    <div className={styles.container}>
      {isMobile ? (
        <MobileNavbar />
      ) : (
        <>
          <TopNavbar />
          <MainNavbar />
        </>
      )}
     
<div className={styles.heroSection}>
  <div className={styles.heroContent}>
    <div className={styles.heroLeft}>
      <p className={styles.heroSubtitle}>Order Restaurant food, takeaway and groceries.</p>
      <h1 className={styles.heroTitle}>Feast Your Senses,</h1>
      <h2 className={styles.heroTitleYellow}>Fast and Fresh</h2>
      <div className={styles.searchContainer}>
  <span className={styles.searchLabel}>Enter a postcode to see what we deliver</span>
  <div className={styles.searchBar}>
    
    <input 
      type="text" 
      placeholder="e.g. EC4R3TE" 
      className={styles.searchInput}
    />
    <button className={styles.searchButton}>Search</button>
  </div>
</div>
    </div>
    <div className={styles.heroRight}>
      <div className={styles.imageContainer}>
        <img src={wpizza} alt="Woman eating pizza" className={styles.mainImage} />
        <img src={wnoodle} alt="Woman eating noodles" className={styles.secondaryImage} />
        
        
        <div className={styles.statusBoxesContainer}>
          
          <div className={styles.statusBox1}>
            <img src={num1} alt="1" className={styles.numberImage} />
            <div className={styles.statusBox}>
              <div className={styles.statusHeader}>
                <img src={applogo} alt="Order" className={styles.orderIcon} />
                <span className={styles.timeText}>now</span>
              </div>
              <div className={styles.statusTitle}>We've Received your order!</div>
              <p className={styles.statusDescription}>Awaiting Restaurant acceptance</p>
            </div>
          </div>

         
          <div className={styles.statusBox2}>
            <img src={num2} alt="2" className={styles.numberImage} />
            <div className={styles.statusBox}>
              <div className={styles.statusHeader}>
                <img src={applogo} alt="Order" className={styles.orderIcon} />
                <span className={styles.timeText}>now</span>
              </div>
              <div className={styles.statusTitle}>
                Order Accepted!
                <img src={Tick} alt="Accepted" className={styles.tickIcon} />
              </div>
              <p className={styles.statusDescription}>Your order will be delivered shortly</p>
            </div>
          </div>

          
          <div className={styles.statusBox3}>
            <img src={num3} alt="3" className={styles.numberImage} />
            <div className={styles.statusBox}>
              <div className={styles.statusHeader}>
                <img src={applogo} alt="Order" className={styles.orderIcon} />
                <span className={styles.timeText}>now</span>
              </div>
              <div className={styles.statusTitle}>
                Your rider's nearby
                <span role="img" aria-label="celebration">🎉</span>
              </div>
              <p className={styles.statusDescription}>They're almost there – get ready!</p>
            </div>
          </div>
        </div>

        <div className={styles.orangeCircle}></div>
      </div>
    </div>
  </div>
</div>

      
      <div className={styles.dealsSection}>
        <div className={styles.dealsSectionHeader}>
          <h2>Up to -40% 🎊 Order.uk exclusive deals</h2>
          <div className={styles.categoryFilters}>
            <button>Vegan</button>
            <button>Sushi</button>
            <button className={styles.active}>Pizza and Fast food</button>
            <button>Others</button>
          </div>
        </div>
        <div className={styles.dealsGrid}>
        <img src={bigpic1} alt="Food" className={styles.bigpic} />
        <img src={bigpic2} alt="Food" className={styles.bigpic} />
        <img src={bigpic3} alt="Food" className={styles.bigpic} />
        </div>
      </div>

       {/* Popular Categories */}
       <div className={styles.categoriesSection}>
        <h2>Order.uk Popular Categories 🤩</h2>
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryImageContainer}>
                <img src={category.image} alt={category.name} />
              </div>
              <div className={styles.categoryInfo}>
                <h3>{category.name}</h3>
                <p>{category.restaurants}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RestaurantsSection />

      {/* Download Section */}
      <div className={styles.downloadSection}>
        <div className={styles.downloadContent}>
          <div className={styles.downloadLeft}>
          <img src={couple} alt="Happy couple using app" className={styles.coupleImage2} />
            <img src={couple} alt="Happy couple using app" className={styles.coupleImage} />
            <div className={styles.downloadText}>
              <div className={styles.appTitle}>
              <img src={applogo} alt="Order logo" /><span className={styles.highlight}>ing</span> is more
              </div>
              <div className={styles.personalizedBar}>
                <span className={styles.personalized}>Personalised</span> & Instant
              </div>
              <div className={styles.downloadInfo}>
                Download the Order.uk app for faster ordering
              </div>
              <div className={styles.storeButtons}>
                <img src={playstore} alt="App Store" />
                
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Partner Cards Section */}
       <div className={styles.partnerSection}>
        <img 
          src={businessPartnerImage} 
          alt="Partner with us" 
          className={styles.partnerImage}
        />
        <img 
          src={riderPartnerImage} 
          alt="Ride with us" 
          className={styles.partnerImage}
        />
      </div>

    {/* Know More Section */}
<div className={styles.knowMoreSection}>
  <div className={styles.knowMoreHeader}>
    <h2>Know more about us!</h2>
    <div className={styles.navTabs}>
      <button className={`${styles.tab} ${styles.active}`}>Frequent Questions</button>
      <button className={styles.tab}>Who we are?</button>
      <button className={styles.tab}>Partner Program</button>
      <button className={styles.tab}>Help & Support</button>
    </div>
  </div>

  <div className={styles.knowMoreContent}>
    <div className={styles.faqSection}>
      <button className={`${styles.faqButton} ${styles.active}`}>How does Order.uk work?</button>
      <button className={styles.faqButton}>What payment methods are accepted?</button>
      <button className={styles.faqButton}>Can I track my order in real-time?</button>
      <button className={styles.faqButton}>Are there any special discounts or promotions available?</button>
      <button className={styles.faqButton}>Is Order.UK available in my area?</button>
    </div>

    <div className={styles.infoCards}>
      <div className={styles.infoCard}>
        <h3>Place an Order!</h3>
        <div className={styles.iconCircle}><img src={cap} alt="Food" className={styles.capimg} /></div>
        <p>Place order through our website or Mobile app</p>
      </div>

      <div className={styles.infoCard}>
        <h3>Track Progress</h3>
        <div className={styles.iconCircle}><img src={fod} alt="Food" className={styles.fodimg} /></div>
        <p>You can track your order status with delivery time</p>
      </div>

      <div className={styles.infoCard}>
        <h3>Get your Order!</h3>
        <div className={styles.iconCircle}><img src={phone} alt="Food" className={styles.phoneimg} /></div>
        <p>Receive your order at a lightning-fast speed!</p>
      </div>

     
      <p className={styles.processDescription}>
        Order.UK simplifies the food ordering process. Browse through our diverse menu, 
        select your favorite dishes, and proceed to checkout. Your delicious meal will be 
        on its way to your doorstep in no time!
      </p>
    </div>
  </div>
</div>


      {/* Stats Bar */}
      <div className={styles.statsBar}>
  <div className={styles.statsContent}>
    <div className={styles.statItem}>
      <div className={styles.statNumber}>546+</div>
      <div className={styles.statLabel}>Registered Riders</div>
    </div>
    
    <div className={styles.statItem}>
      <div className={styles.statNumber}>789,900+</div>
      <div className={styles.statLabel}>Orders Delivered</div>
    </div>
    
    <div className={styles.statItem}>
      <div className={styles.statNumber}>690+</div>
      <div className={styles.statLabel}>Restaurants Partnered</div>
    </div>
    
    <div className={styles.statItem}>
      <div className={styles.statNumber}>17,457+</div>
      <div className={styles.statLabel}>Food Items</div>
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
};

export default HomePage;