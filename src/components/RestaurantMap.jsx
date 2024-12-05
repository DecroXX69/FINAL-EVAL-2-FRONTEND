import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './RestaurantMap.module.css';
import RouterIcon from '../assets/marker-icon.png';

// Restaurant location data
const restaurantLocations = {
  mcdonalds: {
    coords: [51.5074, -0.1278],
    address: "123 McDonald's Way, London Bridge, London SE1 2TF, UK",
    phone: "+44 20 7123 4567",
    website: "http://mcdonalds.uk/",
    area: "South London"
  },
  papa: {
    coords: [51.5154, -0.1367],
    address: "456 Papa Johns Street, Camden, London NW1 7BY, UK",
    phone: "+44 20 7234 5678",
    website: "http://papajohns.co.uk/",
    area: "North London"
  },
  kfc: {
    coords: [51.5007, -0.1246],
    address: "789 KFC Road, Waterloo, London SE1 8RT, UK",
    phone: "+44 20 7345 6789",
    website: "http://kfc.co.uk/",
    area: "South London"
  },
  texas: {
    coords: [51.5123, -0.1442],
    address: "321 Texas Ave, Covent Garden, London WC2E 9RZ, UK",
    phone: "+44 20 7456 7890",
    website: "http://texaschicken.co.uk/",
    area: "Central London"
  },
  king: {
    coords: [51.5142, -0.1494],
    address: "654 Burger King Square, Soho, London W1F 9JY, UK",
    phone: "+44 20 7567 8901",
    website: "http://burgerking.co.uk/",
    area: "West London"
  },
  shawarma: {
    coords: [51.5132, -0.1185],
    address: "987 Shawarma Lane, Clerkenwell, London EC1V 8AB, UK",
    phone: "+44 20 7678 9012",
    website: "http://shawarma1.co.uk/",
    area: "East London"
  }
};

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

const MapComponent = ({ center, zoom, selectedRestaurant }) => {
  const map = useMap();
  
  // Initialize Google Streets layer
  const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });

  useEffect(() => {
    // Add Google Streets layer
    googleStreets.addTo(map);

    // Update view when selected restaurant changes
    if (selectedRestaurant && restaurantLocations[selectedRestaurant.id]) {
      map.setView(restaurantLocations[selectedRestaurant.id].coords, zoom);
    }

    // Cleanup function to remove the layer when component unmounts
    return () => {
      map.removeLayer(googleStreets);
    };
  }, [selectedRestaurant, map, zoom, googleStreets]);

  return null;
};

const RestaurantMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const handleRestaurantUpdate = () => {
      const restaurant = JSON.parse(localStorage.getItem('selectedRestaurant'));
      setSelectedRestaurant(restaurant);
      
      if (restaurant && restaurantLocations[restaurant.id]) {
        setRestaurantData(restaurantLocations[restaurant.id]);
      }
    };

    // Initial load
    handleRestaurantUpdate();

    // Listen for restaurant changes
    window.addEventListener('storage', handleRestaurantUpdate);
    return () => window.removeEventListener('storage', handleRestaurantUpdate);
  }, []);

  useEffect(() => {
    // Update when URL changes
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');
    if (restaurantId && restaurantLocations[restaurantId]) {
      setRestaurantData(restaurantLocations[restaurantId]);
    }
  }, [window.location.search]);

  if (!selectedRestaurant || !restaurantData) {
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.restaurantInfo}>
        <div className={styles.header}>
          <h2 className={styles.restaurantName}>{selectedRestaurant.name}</h2>
          <p className={styles.location}>{restaurantData.area}</p>
        </div>
        <p className={styles.address}>{restaurantData.address}</p>
        <div className={styles.contactInfo}>
          <div className={styles.phoneSection}>
            <p className={styles.label}>Phone number:</p>
            <p className={styles.value}>{restaurantData.phone}</p>
          </div>
          <div className={styles.websiteSection}>
            <p className={styles.label}>Website:</p>
            <a 
              href={restaurantData.website}
              className={styles.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurantData.website}
            </a>
          </div>
        </div>
      </div>
      <MapContainer
        center={restaurantData.coords}
        zoom={15}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapComponent 
          center={restaurantData.coords}
          zoom={15}
          selectedRestaurant={selectedRestaurant}
        />
        <Marker 
          position={restaurantData.coords}
          icon={CustomMarkerIcon()}
        >
          <Popup>
            <div>
              <strong>{selectedRestaurant.name}</strong>
              <br />
              {restaurantData.address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;