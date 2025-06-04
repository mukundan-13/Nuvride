// Corrected and enhanced version of your RequestRide component
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Swal from 'sweetalert2';
import { getDistance } from 'geolib';
import { useNavigate } from 'react-router-dom';
// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const LocationSelector = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const RequestRide = () => {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [startPosition, setStartPosition] = useState(null);
  const [destPosition, setDestPosition] = useState(null);
  const [rating, setRating] = useState(4.0);
  const [drivers, setDrivers] = useState([]);
  const [city, setCity] = useState('');

  // useEffect(() => {
  //   if (!city || !selectedTransport) return;
  
  //   fetch(`http://localhost:8085/api/drivers/available-in-city?city=${city}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched drivers:", data);
  //       console.log("Selected transport:", selectedTransport);
  
  //       const filteredDrivers = data.filter((driver) => {
  //         console.log(
  //           `Checking driver ${driver.name}:`,
  //           `Available: ${driver.is_available}`,
  //           `Type: ${driver.vehicleType?.toLowerCase()} === ${selectedTransport.toLowerCase()}`
  //         );
  
  //         return (
          
  //           driver.vehicleType?.toLowerCase() === selectedTransport.toLowerCase()
  //         );
  //       });
  
  //       console.log("Filtered drivers:", filteredDrivers);
  //       setDrivers(filteredDrivers);
  //     })
  //     .catch((err) => console.error("Fetch error:", err));
  // }, [city, selectedTransport]);
  
  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
  };
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startPosition || !destPosition || !selectedTransport || !city) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please select source and destination, transport type, and city.',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8085/api/drivers/available-in-city?city=${city}`);
      const data = await response.json();
      const filtered = data.filter(driver => driver.rating >= rating && driver.vehicleType?.toLowerCase()===selectedTransport)
      ;
      setDrivers(filtered);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Could not fetch drivers.' });
    }
  };

  const handleRequestDriver = async (driverId, driverPosition) => {
    try {
      const rideRequest = {
        userId: 1,
        driverId,
        sourceLatitude: startPosition.lat,
        sourceLongitude: startPosition.lng,
        destinationLatitude: destPosition.lat,
        destinationLongitude: destPosition.lng,
        vehicleType: selectedTransport,
      };

      const response = await fetch('http://localhost:8085/api/rides/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideRequest),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({ icon: 'success', title: 'Ride Booked', text: 'Redirecting to payment...' });
        handlePayment(result);
      } else {
        Swal.fire({ icon: 'error', title: 'Unavailable', text: 'Driver not available' });
      }
    } catch (error) {
      console.error('Ride request failed:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong.' });
    }
  };
  const navigate=useNavigate();
  const handlePayment = (rideDetails) => {
    Swal.fire({
      icon: 'info',
      title: 'Redirecting to Payment Page',
      text: `Processing payment for ride from ${rideDetails.sourceAddress} to ${rideDetails.destAddress}`,
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate('/ride-payment', { state: rideDetails });
    });
  };
  const calculateDistanceAndPrice = (lati,longi) => {
    if (!startPosition) return { distance: 0, price: 0 };
    // const driverPosition=[lati,longi];
    console.log(startPosition);
    const distance = getDistance({
      latitude:startPosition.lat,longitude:startPosition.lng},
      { latitude:lati,longitude:longi}) / 1000;
    const price = parseFloat((distance * 10).toFixed(2));
    return { distance, price };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full md:w-3/4 grid grid-cols-2 gap-6 mb-8">
        {['Car', 'Bike', 'Taxi', 'Auto'].map((transport) => (
          <div
            key={transport}
            onClick={() => handleTransportSelect(transport.toLowerCase())}
            className={`cursor-pointer bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center text-center ${
              selectedTransport === transport.toLowerCase() ? 'bg-blue-200' : 'hover:bg-blue-100'
            } transition duration-200`}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{transport}</h3>
            <div className="text-gray-600">Select your preferred transport</div>
          </div>
        ))}
      </div>

      {selectedTransport && (
        <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`Select Locations for ${selectedTransport}`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Start Location', startPosition, setStartPosition], ['Destination Location', destPosition, setDestPosition]].map(
              ([label, position, setPosition], idx) => (
                <div key={idx}>
                  <h3 className="text-gray-700 font-medium mb-2">{label}</h3>
                  <MapContainer center={[12.976, 77.5946]} zoom={13} style={{ height: '300px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
                    <LocationSelector position={position} setPosition={setPosition} />
                  </MapContainer>
                  {position && (
                    <p className="mt-2 text-sm text-gray-600">
                      Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-gray-700 font-medium mb-2">City</h3>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-2 p-3 border rounded-lg w-full"
              placeholder="Enter your city"
              required
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="rating" className="text-gray-600 block">Minimum Rating</label>
              <input
                type="number"
                id="rating"
                value={rating}
                step="0.1"
                min="0"
                max="5"
                onChange={(e) => setRating(e.target.value)}
                className="mt-2 p-3 border rounded-lg w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Search for drivers
            </button>
          </form>
        </div>
      )}

      {drivers.length > 0 && (
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers.map((driver) => {
            const { distance, price } = calculateDistanceAndPrice(driver.latitude,driver.longitude);
            return (
              <div key={driver.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800">{driver.name}</h3>
                <p className="text-gray-600">Phone: {driver.phoneNumber}</p>
                <p className="text-gray-600">Vehicle: {driver.vehicleType}</p>
                <p className="text-gray-600">Rating: {driver.rating}</p>
                <p className="text-gray-600">Distance: {distance.toFixed(2)} km</p>
                <p className="text-gray-600">Price: Rs:{price.toFixed(2)}</p>
                <p className={`font-semibold ${driver.available ? 'text-green-600' : 'text-red-600'}`}>
                  {driver.available ? 'Available' : 'Not Available'}
                </p>
                <button
                  onClick={() => handleRequestDriver(driver.id, driver.latitude,driver.longitude)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Request Driver
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestRide;