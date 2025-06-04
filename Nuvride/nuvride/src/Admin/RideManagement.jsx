import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8085/api/rides"; // adjust if different

const RideManagement = () => {
  const [rides, setRides] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    driverId: "",
    sourceLat: "",
    sourceLng: "",
    destLat: "",
    destLng: "",
    sourceAddress: "",
    destAddress: "",
    distanceInKm: "",
    fareAmount: "",
    status: "PENDING",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRides = async () => {
    try {
      const res = await axios.get(API_URL);
      setRides(res.data);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({
        userId: "",
        driverId: "",
        sourceLat: "",
        sourceLng: "",
        destLat: "",
        destLng: "",
        sourceAddress: "",
        destAddress: "",
        distanceInKm: "",
        fareAmount: "",
        status: "PENDING",
      });
      setEditingId(null);
      fetchRides();
    } catch (err) {
      console.error("Failed to save ride:", err);
    }
  };

  const handleEdit = (ride) => {
    setFormData(ride);
    setEditingId(ride.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRides();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ride Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded shadow mb-8">
        {[
          "userId",
          "driverId",
          "sourceLat",
          "sourceLng",
          "destLat",
          "destLng",
          "sourceAddress",
          "destAddress",
          "distanceInKm",
          "fareAmount",
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="p-2 border rounded"
            required
          />
        ))}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="PENDING">PENDING</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Ride" : "Add Ride"}
        </button>
      </form>

      <div className="overflow-auto">
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">User</th>
              <th className="border p-2">Driver</th>
              <th className="border p-2">Source</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Fare</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id} className="hover:bg-gray-50">
                <td className="border p-2">{ride.userId}</td>
                <td className="border p-2">{ride.driverId}</td>
                <td className="border p-2">{ride.sourceAddress}</td>
                <td className="border p-2">{ride.destAddress}</td>
                <td className="border p-2">{ride.fareAmount}</td>
                <td className="border p-2">{ride.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(ride)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ride.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RideManagement;
