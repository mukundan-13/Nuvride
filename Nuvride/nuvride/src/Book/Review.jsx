import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Review = ({ open, onClose, vehicleId, bookingId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!comment || !rating) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Information',
          text: 'Both comment and rating are required.',
        });
        return;
      }

      const payload = {
        user: { id: userId },
        vehicle: { id: vehicleId },
        comment,
        rating: parseInt(rating, 10),
        booking: { id: bookingId },
      };

      await axios.post(
        `http://localhost:8085/api/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Your review has been successfully added!',
      });
      onClose(true);
    } catch (error) {
      onClose(true);
      console.error('Error submitting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Failed to submit review. Please try again.',
      });
    }
  };

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Add Your Review</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => onClose(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Review;
