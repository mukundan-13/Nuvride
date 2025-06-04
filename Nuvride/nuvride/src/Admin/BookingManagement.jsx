import { useState, useEffect } from "react";
import axios from "axios";

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8085/api/bookings/${id}`, {
        status: newStatus,
      });
      fetchBookings();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h3 className="text-lg mb-2">Booking List</h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="flex flex-col sm:flex-row justify-between mb-4 border-b pb-2">
              <div>
                <p>
                  <strong>Vehicle:</strong> {booking.vehicle.model}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <p>
                  <strong>User:</strong> {booking.user.firstName}
                </p>
                <p>
                  <strong>Phone number:</strong>{booking.user.phoneNumber}
                </p>
              </div>

              <div className="flex items-center mt-2 sm:mt-0">
                <select
                  defaultValue={booking.status}
                  onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded mr-2"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingManagementPage;