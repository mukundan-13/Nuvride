import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, vehicleId } = location.state || {};
  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
  const userId = localStorage.getItem('userId');
  const startDate = localStorage.getItem('startDate');
  const endDate = localStorage.getItem('endDate');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    Swal.fire({
      title: 'Error',
      text: 'User not logged in. Please login to continue.',
      icon: 'error',
    });
    return;
  }

  if (paymentOption === 'card' && (!cardNumber || !expiryDate || !cvv)) {
    Swal.fire({
      title: 'Incomplete Card Details',
      text: 'Please fill in all card details.',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
    return;
  }

  if (paymentOption === 'upi' && !upiId) {
    Swal.fire({
      title: 'Incomplete UPI Details',
      text: 'Please provide your UPI ID.',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
    return;
  }

  try {
    if (paymentOption === 'wallet') {
      const deductRes = await fetch(
        `http://localhost:8085/api/wallet/deduct?userId=${userId}&amount=${totalAmount}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!deductRes.ok) {
        const msg = await deductRes.text();
        throw new Error(msg || 'Insufficient wallet balance.');
      }
    }

    Swal.fire({
      title: 'Processing Payment',
      text: 'Please wait...',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    const bookingData = {
      vehicle: { id: vehicleId },
      user: { id: userId },
      startDate,
      endDate,
      totalPrice: totalAmount,
      status: 'CONFIRMED',
    };

    const response = await fetch('http://localhost:8085/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) throw new Error('Failed to create booking');

    const booking = await response.json();

    Swal.fire({
      title: 'Payment Successful!',
      text: `Your payment of $${totalAmount} has been processed.`,
      icon: 'success',
      confirmButtonText: 'Continue',
    }).then(() => {
      navigate(`/booking-summary/${booking.id}`);
    });

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again',
    });
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
      <p className="text-lg mb-4">Total Amount: <strong>${totalAmount}</strong></p>

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
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="wallet"
              checked={paymentOption === 'wallet'}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Wallet
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
          className={`px-4 py-2 rounded text-white ${
            paymentOption ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
