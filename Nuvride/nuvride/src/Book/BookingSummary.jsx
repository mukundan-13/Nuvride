import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingSummary = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/bookings/${bookingId}`);
        setBooking(response.data);

        const vehicleResponse = await axios.get(`http://localhost:8085/api/vehicles/${response.data.vehicle.id}`);
        setVehicle(vehicleResponse.data);
      } catch (error) {
        console.error('Error fetching booking or vehicle details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking || !vehicle) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Booking Summary</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={vehicle.imageUrl || '/placeholder.jpg'}
          alt={vehicle.model || 'Vehicle'}
          className="w-full sm:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{vehicle.model}</h3>
          <p className="mb-1"><strong>Manufacture Year:</strong> {vehicle.manufacturingYear}</p>
          <p className="mb-1"><strong>Company Name:</strong> {vehicle.companyName}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2"><strong>Start Date:</strong> {booking.startDate}</p>
        <p className="mb-2"><strong>End Date:</strong> {booking.endDate}</p>
        <p className="mb-2"><strong>Total Amount:</strong> ${booking.totalPrice}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/myBookings')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
