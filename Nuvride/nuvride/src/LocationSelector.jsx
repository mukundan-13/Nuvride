import { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const LocationSelector = ({ position, setPosition }) => {
  const [selectedPosition, setSelectedPosition] = useState(position);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedPosition({ lat, lng });
    setPosition({ lat, lng });
  };

  return (
    <>
      <Marker position={selectedPosition}>
        <Popup>
          <span>Selected Location</span>
        </Popup>
      </Marker>
      <div onClick={handleMapClick} className="leaflet-container">
        {/* This ensures that the user can click on the map to update location */}
      </div>
    </>
  );
};

export default LocationSelector;