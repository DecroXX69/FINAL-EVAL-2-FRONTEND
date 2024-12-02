// AddressSection.js
import React, { useState, useContext } from 'react';
import AddressModal from './AddressModal';
import styles from './AddressSection.module.css'; 
import { ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
const AddressSection = ({ onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const { user } = useContext(AuthContext);
  const handleAddAddress = (address) => {
    if (editingAddress !== null) {
      setAddresses(addresses.map((addr, index) => 
        index === editingAddress ? { ...address, name: user.name } : addr
      ));
      setEditingAddress(null);
    } else {
      setAddresses([...addresses, { ...address, name: user.name }]);
    }
  };


  const handleEdit = (index) => {
    setEditingAddress(index);
    setShowModal(true);
  };

  const handleRemove = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
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
          <div key={index} className={styles.addressCard}>
            {index === 0 && <span className={styles.defaultTag}>Default</span>}
            <h3>{address.name}</h3>
            <p>{address.fullAddress}</p>
            <p>Phone Number: {address.phoneNumber}</p>
            <div className={styles.addressActions}>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleRemove(index)}>Remove</button>
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