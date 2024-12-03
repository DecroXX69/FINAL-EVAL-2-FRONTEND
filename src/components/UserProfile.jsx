import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './UserProfile.module.css';
import { ArrowLeft, Edit2, PlusCircle, CreditCard } from 'lucide-react';
import TopNavbar from './TopNavbar';
import MainNavbar from './MainNavbar';
import Footer from './footer';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [userData, setUserData] = useState({
    name: user?.user.name || '',
    email: user?.user.email || '',
    gender: 'Male',
    country: 'India'
  });

  // Initialize with 2 predefined cards using logged-in user's name
  const [savedCards, setSavedCards] = useState([
    { id: 1, number: 'xxxx xxxx xxxx 1234', name: user?.user.name || '' },
    { id: 2, number: 'xxxx xxxx xxxx 5678', name: user?.user.name || '' }
  ]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => setIsEditing(false);
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowCardModal(true);
  };

  const handleAddNewCard = () => {
    setEditingCard(null);
    setShowCardModal(true);
  };

  const handleSaveCard = (cardData) => {
    if (editingCard) {
      // For editing existing cards
      setSavedCards(savedCards.map(card => 
        card.id === editingCard.id ? {
          ...card,
          number: `xxxx xxxx xxxx ${cardData.number.slice(-4)}`,
          name: cardData.name,
          expiration: cardData.expiration
        } : card
      ));
    } else {
      // For adding new cards
      const formattedCardNumber = cardData.number.replace(/\s/g, '');
      setSavedCards([...savedCards, {
        ...cardData,
        number: `xxxx xxxx xxxx ${formattedCardNumber.slice(-4)}`,
        id: Date.now()
      }]);
    }
    setShowCardModal(false);
  };

  const handleRemoveCard = (cardId) => {
    setSavedCards(savedCards.filter(card => card.id !== cardId));
    setShowCardModal(false);
  };
  return (
    <div className={styles.Container}>
      <TopNavbar />
      <MainNavbar />
    <div className={styles.profileContainer}>
      <div className={styles.headerSection}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft size={24} />
          <span>My Profile</span>
        </button>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
            <img src="/api/placeholder/80/80" alt="Profile" />
          </div>
          <h2>{userData.name}</h2>
          <button onClick={handleEdit} className={styles.editButton}>
            <Edit2 size={20} />
          </button>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className={styles.saveButtonContainer}>
            <button onClick={handleSave} className={styles.saveButton}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.paymentSection}>
          <h3>Saved Payment Methods</h3>
          <div className={styles.cardsGrid}>
            {savedCards.map((card) => (
              <div key={card.id} className={styles.cardItem}>
                <div className={styles.cardIcon}>
                  <CreditCard size={24} />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardNumber}>{card.number}</span>
                  <span className={styles.cardName}>{card.name}</span>
                  
                </div>
                <button
                  onClick={() => handleEditCard(card)}
                  className={styles.editCardButton}
                >
                  <Edit2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={handleAddNewCard} className={styles.addCardButton}>
              <PlusCircle size={24} />
              <span>Add New Card</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {showCardModal && (
        <CardModal
        card={editingCard}
        onClose={() => setShowCardModal(false)}
        onSave={handleSaveCard}
        onRemove={handleRemoveCard}
        isEditMode={!!editingCard}
      />
      )}
    </div>
  );
};



const CardModal = ({ card, onClose, onSave, onRemove, isEditMode }) => {
  const [cardData, setCardData] = useState({
    number: isEditMode ? (card?.number?.slice(-4) || '') : '',
    expiration: card?.expiration || '',
    cvc: '',
    name: card?.name || ''
  });
  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    if (isEditMode) {
      // Only allow last 4 digits in edit mode
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      return `xxxx xxxx xxxx ${cleaned}`;
    } else {
      // Allow full card number in add mode
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const groups = cleaned.match(/.{1,4}/g) || [];
      return groups.join(' ');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiration') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      } else {
        formattedValue = cleaned;
      }
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData({
      ...cardData,
      [name]: formattedValue
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isEditMode) {
      if (!cardData.number || cardData.number.slice(-4).length !== 4) {
        newErrors.number = 'Please enter last 4 digits of card';
      }
    } else {
      if (!cardData.number || cardData.number.replace(/\s/g, '').length !== 16) {
        newErrors.number = 'Please enter valid 16-digit card number';
      }
      if (!cardData.cvc || cardData.cvc.length !== 3) {
        newErrors.cvc = 'Please enter valid 3-digit CVC';
      }
    }

    if (!cardData.expiration || !cardData.expiration.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiration = 'Invalid expiration date (MM/YY)';
    }
    if (!cardData.name.trim()) {
      newErrors.name = 'Please enter name on card';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(cardData);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{isEditMode ? 'Edit Payment Method' : 'Add New Card'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Card Number</label>
            <input
              type="text"
              name="number"
              value={cardData.number}
              onChange={handleInputChange}
              placeholder={isEditMode ? "xxxx xxxx xxxx __" : "Enter card number"}
              maxLength={isEditMode ? 19 : 19}
              className={errors.number ? styles.errorInput : ''}
            />
            {errors.number && <span className={styles.errorText}>{errors.number}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Expiration</label>
            <input
              type="text"
              name="expiration"
              value={cardData.expiration}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength={5}
              className={errors.expiration ? styles.errorInput : ''}
            />
            {errors.expiration && <span className={styles.errorText}>{errors.expiration}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>CVC</label>
            {isEditMode ? (
              <input
                type="text"
                disabled
                value="XXX"
                className={styles.disabledInput}
              />
            ) : (
              <input
                type="text"
                name="cvc"
                value={cardData.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
                maxLength={3}
                className={errors.cvc ? styles.errorInput : ''}
              />
            )}
            {errors.cvc && <span className={styles.errorText}>{errors.cvc}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Name on Card</label>
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={handleInputChange}
              placeholder="Name on card"
              className={errors.name ? styles.errorInput : ''}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
          <div className={styles.modalButtons}>
            <button 
              type="button" 
              onClick={() => onRemove(card?.id)}
              className={styles.removeButton}
            >
              Remove
            </button>
            <div className={styles.rightButtons}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;