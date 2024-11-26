import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService, handleApiError } from '../services/api';
import styles from './AuthPage.module.css';
import Footer from './footer';
import Food from '../assets/Art.png';
import Applogo from '../assets/applogo.png';
import image2 from '../assets/image2.png';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Handle Registration
        const response = await authService.register(formData);
        alert('Registration Successful! Please Sign In.');
        setIsSignUp(false);
        // Clear form data after successful registration
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          password: '',
        });
      } else {
        // Handle Login
        const response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
        
        // The response should contain both user data and token
        const { user, token } = response.data;
        
        // Call login function from AuthContext with user data and token
        login({ ...user, token });
        
        alert('Login Successful!');
        navigate('/home');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.brandContainer}>
            <img src={Applogo} alt="App Logo" className={styles.logo} />
            <img src={image2} alt="Second Logo" className={styles.secondaryImage} />
            <p className={styles.appDescription}>
              Delivering delicious meals right to your doorstep.
            </p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            {isSignUp && (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="eg. John A"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </>
            )}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                minLength="6"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {isSignUp ? 'Continue' : 'Sign In'}
            </button>
            <p className={styles.switchText}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span
                className={styles.switchButton}
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                  });
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </form>
        </div>
        <div className={styles.rightContainer}>
          <img src={Food} alt="Delicious Food" className={styles.foodImage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;