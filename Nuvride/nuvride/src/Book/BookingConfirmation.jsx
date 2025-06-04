import React from "react";
import dayjs from "dayjs";

const BookingConfirmation = ({ vehicle, startDate, endDate, onCancel, onProceed }) => {
  const calculateTotalAmount = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const numberOfDays = end.diff(start, "day") + 1; // Include end date
    return vehicle.pricePerDay * numberOfDays;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>

        {/* Vehicle Details */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Vehicle Details</h3>
          <p><span className="font-semibold">Company Name:</span> {vehicle.companyName}</p>
          <p><span className="font-semibold">Model:</span> {vehicle.model}</p>
          <p><span className="font-semibold">Capacity:</span> {vehicle.capacity} passengers</p>
          <p><span className="font-semibold">Per Day Price:</span> ${vehicle.pricePerDay}</p>
        </div>

        {/* Booking Dates */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Booking Dates</h3>
          <p><span className="font-semibold">Start Date:</span> {dayjs(startDate).format("YYYY-MM-DD")}</p>
          <p><span className="font-semibold">End Date:</span> {dayjs(endDate).format("YYYY-MM-DD")}</p>
        </div>

        {/* Total Amount */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Total Amount</h3>
          <p className="text-green-600 font-bold text-lg">${totalAmount}</p>
        </div>

        {/* Vehicle Image */}
        <div className="flex justify-center mb-6">
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.companyName} ${vehicle.model}`}
            className="w-64 h-auto object-cover rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onProceed(totalAmount)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
