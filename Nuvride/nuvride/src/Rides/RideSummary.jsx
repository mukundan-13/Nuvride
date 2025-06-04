import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RideSummaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [sourcePlace, setSourcePlace] = useState('');
  const [destPlace, setDestPlace] = useState('');
  const [loading, setLoading] = useState(true);

  // Reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      return data.display_name || `${lat}, ${lng}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return `${lat}, ${lng}`;
    }
  };

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8085/api/rides/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch ride details');

        const data = await response.json();
        setRide(data);

        const [source, dest] = await Promise.all([
          reverseGeocode(data.sourceLat, data.sourceLng),
          reverseGeocode(data.destLat, data.destLng),
        ]);

        setSourcePlace(source);
        setDestPlace(dest);
      } catch (error) {
        console.error('Error fetching ride:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading ride details...</div>;
  if (!ride) return <div className="text-center mt-20 text-red-500">Ride not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">Ride Summary</h2>
      <div className="space-y-4">
        <div><strong>Ride ID:</strong> {ride.id}</div>
        <div><strong>From:</strong> {sourcePlace}</div>
        <div><strong>To:</strong> {destPlace}</div>
        <div><strong>Driver ID:</strong> {ride.driverId}</div>
        <div>
          <strong>Status:</strong>{' '}
          <span className={`font-semibold ${ride.status === 'CONFIRMED' ? 'text-green-600' : 'text-yellow-500'}`}>
            {ride.status}
          </span>
        </div>
        <div><strong>Created At:</strong> {new Date(ride.createdAt).toLocaleString()}</div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default RideSummaryPage;
