import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function DriverDashboard() {
  const [position, setPosition] = useState({ lat: 10.0, lng: 78.0 });
  const [available, setAvailable] = useState(false);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const driverId = localStorage.getItem('driverId');

  const authAxios = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  useEffect(() => {
    if (!token || !driverId) {
      navigate('/');
    } else {
      fetchRequests();
      fetchAvailability();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await authAxios.get(`/api/driver/${driverId}/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests', err);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await authAxios.get(`/api/driver/${driverId}/availability`);
      setAvailable(res.data.available);
    } catch (err) {
      console.error('Error fetching availability', err);
    }
  };

  const updateLocation = async (lat, lng) => {
    setPosition({ lat, lng });
    try {
      await authAxios.post(`/api/driver/${driverId}/update-location`, { lat, lng });
    } catch (err) {
      console.error('Location update failed', err);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await authAxios.post(`/api/driver/${driverId}/toggle-availability`);
      setAvailable(res.data.available);
    } catch (err) {
      console.error('Availability toggle failed', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Driver Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      <p>Status: <span className={available ? 'text-green-600' : 'text-red-600'}>
        {available ? "Available" : "Not Available"}
      </span></p>

      <button onClick={toggleAvailability} className="my-2 bg-blue-500 text-white px-4 py-1 rounded">
        {available ? "Set Unavailable" : "Set Available"}
      </button>

      <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker
          draggable
          position={position}
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              updateLocation(lat, lng);
            }
          }}
        />
      </MapContainer>

      <h3 className="mt-6 text-lg font-semibold">Customer Requests</h3>
      <ul className="list-disc ml-6">
        {requests.length === 0 ? (
          <li>No requests yet</li>
        ) : (
          requests.map((r, i) => (
            <li key={i}>
              <strong>{r.customerName}</strong> — From: {r.startLocation} → To: {r.endLocation}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default DriverDashboard;
