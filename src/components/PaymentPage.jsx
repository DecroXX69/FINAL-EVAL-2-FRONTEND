import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Wallet } from 'lucide-react';
import styles from './PaymentPage.module.css';
import  TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import Footer from './footer';
const PaymentPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  const handlePaymentProceed = () => {
    setShowSuccess(true);
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className={styles.paymentPage}>
      <TopNavbar />
      <MainNavbar />
    <div className={styles.paymentContainer}>
      {!showSuccess ? (
        <>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <h1>Choose and Pay</h1>
          </div>

          <div className={styles.paymentContent}>
            <div className={styles.paymentMethods}>
              <div className={styles.walletSection}>
                <div className={styles.walletOption}>
                  <div className={styles.leftContent}>
                    <div className={styles.iconCircle} style={{ backgroundColor: '#FFF3E9' }}>
                      <Wallet size={20} color="#FF8A00" />
                    </div>
                    <div className={styles.walletInfo}>
                      <span className={styles.methodName}>Wallet</span>
                      <span className={styles.balance}>Available balance: ₹300</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#FF8A00" />
                </div>
              </div>

              <div className={styles.paymentOptions}>
                {['Mastercard', 'Paypal', 'Stripe'].map((method) => (
                  <div key={method} className={styles.paymentOption}>
                    <div className={styles.leftContent}>
                      <div className={styles.iconCircle} style={{ backgroundColor: '#FFF3E9' }}>
                        <span className={styles.initial}>{method[0]}</span>
                      </div>
                      <span className={styles.methodName}>{method}</span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPayment === method}
                      onChange={() => setSelectedPayment(method)}
                      className={styles.radioInput}
                    />
                  </div>
                ))}
              </div>

              <button className={styles.addDebitCard}>
                <span>+ Add Debit Card</span>
              </button>
            </div>

            <div className={styles.paymentSummary}>
              <div className={styles.amountBox}>
                <span>Amount to be paid</span>
                <span className={styles.amount}>₹240</span>
              </div>
              <button 
                className={styles.proceedButton}
                onClick={handlePaymentProceed}
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.successContainer}>
          <div className={styles.successContent}>
            <div className={styles.checkmark}>✓</div>
            <h2>Order Placed Successfully</h2>
            <p className={styles.successMessage}>
              Your order is confirmed and on its way. Get set to savor your chosen delights!
            </p>
            <div className={styles.orderDetails}>
              {cart.map((item) => (
                <div key={item._id} className={styles.orderItem}>
                  {item.name}
                </div>
              ))}
              <button 
                className={styles.backToHomeButton}
                onClick={handleBackToHome}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
    <Footer />
    
    </div>
  );
};

export default PaymentPage;