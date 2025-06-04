import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddReview from './Review'; // Import the modal component

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewedBookings, setReviewedBookings] = useState([]); // Track reviewed booking IDs
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Fetch bookings
        const response = await axios.get(`http://localhost:8085/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);

        // Fetch reviews
        const reviewsResponse = await axios.get(`http://localhost:8085/api/reviews/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
        setReviewedBookings(reviewedBookingIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const handleAddReviewClick = (vehicleId, bookingId) => {
    setSelectedVehicleId(vehicleId);
    setSelectedBookingId(bookingId);
    setModalOpen(true);
  };

  const handleModalClose = (success) => {
    setModalOpen(false);
    if (success) {
      // Refresh reviews after successful submission
      const fetchReviews = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');

          const reviewsResponse = await axios.get(`http://localhost:8085/api/reviews/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
          setReviewedBookings(reviewedBookingIds);
        } catch (error) {
          console.error('Error refreshing reviews:', error);
        }
      };

      fetchReviews();
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      // Show a confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel this booking?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
      });

      // If the user confirms the cancellation
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');

        // Cancel the booking
        await axios.put(`http://localhost:8085/api/bookings/cancel/${bookingId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove the canceled booking from the local state
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));

        // Optionally, fetch the updated list of bookings
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8085/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data); // Update the state with the new list of bookings

        // Show a success message after cancellation
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your booking has been successfully canceled.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);

      // Show an error message in case of failure
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while canceling your booking. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (bookings.length === 0) {
    return <div className="text-center">No bookings found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          // Only show the Cancel button for "CONFIRMED" bookings that are at least 1 day away
          const canCancel =
            booking.status === 'CONFIRMED' &&
            new Date(booking.startDate) - new Date() > 86400000;

          return (
            <div key={booking.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={booking.vehicle.imageUrl}
                alt={booking.vehicle.model}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{booking.vehicle.model}</h3>
              <p className="text-sm text-gray-600">{booking.vehicle.manufacturingYear}</p>
              <p className="text-sm">
                <strong>Start Date:</strong> {booking.startDate}
              </p>
              <p className="text-sm">
                <strong>End Date:</strong> {booking.endDate}
              </p>
              <p className="text-sm">
                <strong>Total Amount:</strong> ${booking.totalPrice}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {booking.status}
              </p>

              <div className="mt-4">
                {canCancel && (
                  <button
                    className="w-full bg-red-500 text-white py-2 rounded-lg"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
                {booking.status === 'COMPLETED' && !reviewedBookings.includes(booking.id) && (
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2"
                    onClick={() => handleAddReviewClick(booking.vehicle.id, booking.id)}
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedVehicleId && selectedBookingId && (
        <AddReview
          open={modalOpen}
          onClose={handleModalClose}
          vehicleId={selectedVehicleId}
          bookingId={selectedBookingId} // Pass bookingId to modal
        />
      )}
    </div>
  );
};

export default UserBookings;
