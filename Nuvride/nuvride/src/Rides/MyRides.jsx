import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyRides = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8085/api/rides', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rides');
        }

        const data = await response.json();
        setRides(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleCancel = async (rideId) => {
    const result=await Swal.fire({
        title:'Are you sure',
        text:'Sure to cancel ride??',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'Yes Cancel it!!',
        cancelButtonText:'No keep it!!'
    });
    if(!result.isConfirmed) return;
    try {
      setCancellingId(rideId);
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8085/api/rides/${rideId}`, {
        method: 'DELETE', // Change to DELETE if you're doing hard deletes
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Cancellation failed');
      }

      // Filter out or update the canceled ride
      setRides((prev) =>
        prev.map((ride) =>
          ride.id === rideId ? { ...ride, status: 'CANCELLED' } : ride
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading your rides...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">My Rides</h2>

      {rides.length === 0 ? (
        <div className="text-center text-xl">No rides found.</div>
      ) : (
        <div className="space-y-6">
          {rides.map((ride) => (
            <div key={ride.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div><strong>Ride ID:</strong> {ride.id}</div>
              <div><strong>From:</strong> {ride.sourceAddress}</div>
              <div><strong>To:</strong> {ride.destAddress}</div>
              <div><strong>Driver ID:</strong> {ride.driverId}</div>
              <div>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-semibold ${
                    ride.status === 'CONFIRMED'
                      ? 'text-green-600'
                      : ride.status === 'CANCELLED'
                      ? 'text-red-600'
                      : 'text-yellow-500'
                  }`}
                >
                  {ride.status}
                </span>
              </div>
              <div>
                <strong>Created At:</strong> {new Date(ride.createdAt).toLocaleString()}
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => navigate(`/ride-summary/${ride.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  View Details
                </button>

                {ride.status !== 'CANCELLED' && (
                  <button
                    onClick={() => handleCancel(ride.id)}
                    disabled={cancellingId === ride.id}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    {cancellingId === ride.id ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRides;
