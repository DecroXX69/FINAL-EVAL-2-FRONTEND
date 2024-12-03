import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './RestaurantMap.module.css';
import RouterIcon from '../assets/marker-icon.png';

const CustomMarkerIcon = () => {
  return L.divIcon({
    className: styles['custom-marker-icon'],
    html: `
      <div class="${styles.markerContainer}">
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#03081F" />
        </svg>
        <img 
          src="${RouterIcon}" 
          alt="Router Icon" 
          style="
            position: absolute; 
            width: 25px; 
            height: 25px; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%);
          "
        />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const RestaurantMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const restaurantData = JSON.parse(localStorage.getItem('selectedRestaurant'));
    setSelectedRestaurant(restaurantData);
  }, []);

  const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });

  const MapWithStreetView = () => {
    const map = useMap();
    useEffect(() => {
      googleStreets.addTo(map);
    }, [map]);
    return null;
  };

  return (
    <div className={styles.mapContainer}>
      {selectedRestaurant && (
        <div className={styles.restaurantInfo}>
          <div className={styles.header}>
            <h2 className={styles.restaurantName}>{selectedRestaurant.name}</h2>
            <p className={styles.location}>South London</p>
          </div>
          <p className={styles.address}>
            Tooley St, London Bridge, London SE1 2TF, United Kingdom
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.phoneSection}>
              <p className={styles.label}>Phone number:</p>
              <p className={styles.value}>+93444343</p>
            </div>
            <div className={styles.websiteSection}>
              <p className={styles.label}>Website:</p>
              <a 
                href={selectedRestaurant.id === 'mcdonalds' ? 'http://mcdonalds.uk/' : 'http://dummy.com'} 
                className={styles.value}
              >
                {selectedRestaurant.id === 'mcdonalds' ? 'http://mcdonalds.uk/' : 'http://dummy.com'}
              </a>
            </div>
          </div>
        </div>
      )}
      <MapContainer
        center={[51.5074, -0.1278]}
        zoom={13}
        className={styles.map}
      >
        <MapWithStreetView />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedRestaurant && (
          <Marker 
            position={[51.5074, -0.1278]} 
            icon={CustomMarkerIcon()}
          >
            <Popup>
              {selectedRestaurant.name}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;