import React, { useState } from 'react';
import {  Rating } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BookingConfirmation from './BookingConfirmation';

const VehicleCard = ({ vehicle }) => {
  const [isConfirming, setIsConfirming] = useState(false); // State for showing booking confirmation
  const [startDate, setStartDate] = useState(null); // Track start date
  const [endDate, setEndDate] = useState(null); // Track end date
  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Not Authenticated',
        text: 'Please log in or sign up to book a vehicle.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      // Simulating date selection for demo purposes
      const defaultStartDate = new Date().toISOString().split('T')[0];
      const defaultEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      setIsConfirming(true); // Open Booking Confirmation
    }
  };

  const handleCancelConfirmation = () => {
    setIsConfirming(false); // Close Booking Confirmation
  };

  const handleProceedToPayment = (totalAmount) => {
    setIsConfirming(false); // Close Booking Confirmation
    navigate('/payment', { state: { totalAmount, vehicleId: vehicle.id } }); // Pass totalAmount and vehicleId to PaymentPage
  };

  return (
    <>
      <div className="m-4 flex flex-col bg-white shadow-lg rounded-lg">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.companyName} ${vehicle.model}`}
          className="object-cover w-full h-[60%] rounded-t-lg"
        />

        <div className="w-full h-[40%] px-4 py-3">
          <h2 className="text-xl font-semibold">{vehicle.companyName}</h2>
          <h3 className="text-lg">{vehicle.model}</h3>
          <p className="text-sm text-gray-600">Manufacturing Year: {vehicle.manufacturingYear}</p>
          <p className="text-sm text-gray-600">Number Plate: {vehicle.numberPlate}</p>
          <p className="text-sm text-gray-600">Capacity: {vehicle.capacity}</p>
          <p className="text-sm text-gray-600">Price/Day: ${vehicle.pricePerDay}</p>
          
          <div className="flex items-center mt-2">
            <p className="text-sm mr-2">Rating:</p>
            <div className="flex items-center">
              <span className="text-sm">{vehicle.rating}</span>
              {/* Assuming you're using a Rating component here */}
              <div className="ml-2">
                <Rating name="vehicle-rating" value={vehicle.rating} readOnly precision={0.1} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 mt-4 mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={handleBooking}
          >
            Book
          </button>
        </div>
      </div>

      {/* Render Booking Confirmation Dialog */}
      {isConfirming && (
        <BookingConfirmation
          vehicle={vehicle}
          startDate={startDate}
          endDate={endDate}
          onCancel={handleCancelConfirmation}
          onProceed={handleProceedToPayment}
        />
      )}
    </>
  );
};

export default VehicleCard;
