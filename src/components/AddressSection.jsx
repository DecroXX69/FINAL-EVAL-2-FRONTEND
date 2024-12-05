import React, { useState, useEffect, useContext } from 'react';
import AddressModal from './AddressModal';
import styles from './AddressSection.module.css';
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddressSection = ({ onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  
  useEffect(() => {
    
    const fetchAddresses = async () => {
      const token = localStorage.getItem('token');
      try {
        console.log('User ID:', user ? user.user.id : 'No ID'); 
        console.log('User from AuthContext:', user);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.user.id}/addresses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setAddresses(data.addresses);
        } else {
          console.error('Failed to fetch addresses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, [user]);

  const handleNavigateToCheckout = (address) => {
    navigate('/checkout', { state: { selectedAddress: address } });
  };

 
  const handleAddAddress = async (address) => {
    const token = localStorage.getItem('token');
    try {
      let url = `${process.env.REACT_APP_API_URL}/api/users/${user.user.id}/addresses`;
      let method = 'POST';

      if (editingAddress !== null) {
        url += `/${addresses[editingAddress]._id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
         },
        body: JSON.stringify(address),
      });

      const data = await response.json();
      if (data.success) {
        setAddresses(data.addresses);
        setShowModal(false);
        setEditingAddress(null);
      } else {
        console.error('Failed to save address:', data.message);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

 
  const handleRemove = async (index) => {
    const token = localStorage.getItem('token');
    try {
      const addressId = addresses[index]._id;
      console.log(addressId);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.user.id}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
         },
      });

      const data = await response.json();
      if (data.success) {
        setAddresses(data.addresses);
      } else {
        console.error('Failed to delete address:', data.message);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };


  const handleEdit = (index) => {
    setEditingAddress(index);
    setShowModal(true);
  };

  return (
    <div className={styles.addressContainer}>
      <div className={styles.addressHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h2>Your Addresses</h2>
      </div>
  
      <div className={styles.addressGrid}>
        <div className={styles.addAddressCard} onClick={() => setShowModal(true)}>
          <div className={styles.plusIconWrapper}>
            <span className={styles.plusIcon}>+</span>
          </div>
          <span>Add Address</span>
        </div>
  
        {addresses.map((address, index) => (
          <div key={address._id} className={styles.addressCard} onClick={() => {
            console.log('Address clicked:', address);
            handleNavigateToCheckout(address);
          }}>
            {index === 0 && (
              <span className={`${styles.defaultTag} ${styles.defaultBackground}`}>Default</span>
            )}
            <h3>{user.user.name}</h3>
            <p className={styles.addressText}>{address.fullAddress}</p>
            <p className={styles.addressText}>Phone Number: {address.phoneNumber}</p>
            <div className={styles.addressActions}>
              <button className={styles.actionButton} onClick={() => handleEdit(index)}>Edit</button>
              <div className={styles.actionDivider} />
              <button className={styles.actionButton} onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
  
      {showModal && (
        <AddressModal
          onClose={() => {
            setShowModal(false);
            setEditingAddress(null);
          }}
          onSave={handleAddAddress}
          initialAddress={editingAddress !== null ? addresses[editingAddress] : null}
        />
      )}
    </div>
  );
};

export default AddressSection;