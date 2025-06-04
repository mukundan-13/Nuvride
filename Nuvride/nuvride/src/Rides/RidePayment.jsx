import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const rideDetails = location.state || {};
  const navigate = useNavigate();

  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleConfirmPayment = async () => {
    // Validate inputs
    if (paymentOption === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      Swal.fire('Incomplete Card Details', 'Please fill in all card details.', 'error');
      return;
    }
    if (paymentOption === 'upi' && !upiId) {
      Swal.fire('Incomplete UPI Details', 'Please provide your UPI ID.', 'error');
      return;
    }

    try {
      Swal.fire({
        title: 'Processing Payment',
        text: 'Please wait...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8085/api/rides/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rideDetails),
      });

      if (!response.ok) throw new Error('Failed to create ride');

      const ride = await response.json();

      Swal.fire({
        title: 'Payment Successful!',
        text: `Your ride has been booked successfully.`,
        icon: 'success',
        confirmButtonText: 'View Ride',
      }).then(() => {
        navigate(`/ride-summary/${ride.id}`);
      });

    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleCancelPayment = () => {
    Swal.fire({
      title: 'Cancel Payment?',
      text: 'Are you sure you want to cancel the payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No, Go Back',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold mb-2">Payment</h2>
      <p className="text-lg mb-4">Fare Amount: <strong>${rideDetails.fareAmount}</strong></p>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Select Payment Option</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="card"
              checked={paymentOption === 'card'}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="upi"
              checked={paymentOption === 'upi'}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            UPI
          </label>
        </div>
      </div>

      {paymentOption === 'card' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            maxLength={16}
            className="w-full p-2 border rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-2 border rounded"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <input
              type="password"
              placeholder="CVV"
              maxLength={3}
              className="w-full p-2 border rounded"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      )}

      {paymentOption === 'upi' && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full p-2 border rounded"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleCancelPayment}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmPayment}
          disabled={!paymentOption}
          className={`px-4 py-2 rounded text-white ${paymentOption ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
