import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './RestaurantMap.module.css';

const RestaurantMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    // Retrieve the selected restaurant from localStorage
    const restaurantData = JSON.parse(localStorage.getItem('selectedRestaurant'));
    setSelectedRestaurant(restaurantData);
  }, []);

  // Define the icon for the marker
  const markerIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Create the Google Street View layer
  const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });

  // Add the Google Street View layer to the map
  const MapWithStreetView = () => {
    const map = useMap();
    useEffect(() => {
      googleStreets.addTo(map);
    }, [map, googleStreets]);

    return null;
  };

  return (
    <div className={styles.mapContainer}>
      {selectedRestaurant && (
        <div className={styles.restaurantInfo}>
          <h2 className={styles.restaurantName}>{selectedRestaurant.name}</h2>
          <p className={styles.restaurantLocation} style={{ color: '#ff9500' }}>
            {selectedRestaurant.slogan}
          </p>
          <p className={styles.restaurantCity} style={{ color: '#ff9500' }}>
            London
          </p>
          <p className={styles.restaurantAddress}>Tooley St, London Bridge, London SE1 2TF, United Kingdom</p>
          <p className={styles.restaurantPhone} style={{ color: '#ff9500' }}>
            Phone: +93444343
          </p>
          <a className={styles.restaurantWebsite} href={selectedRestaurant.id === 'mcdonalds' ? 'http://mcdonalds.uk/' : '#'} style={{ color: '#ff9500' }}>
            {selectedRestaurant.id === 'mcdonalds' ? 'http://mcdonalds.uk/' : 'http://dummy.com'}
          </a>
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
          <Marker position={[51.5074, -0.1278]} icon={markerIcon}>
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