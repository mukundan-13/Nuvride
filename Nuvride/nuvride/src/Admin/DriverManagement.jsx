import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8085/api/drivers";

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
    vehicleType: "",
    rating: 0,
    isAvailable: true,
    latitude: 0,
    longitude: 0,
    city: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDrivers = async () => {
    const res = await axios.get(API_URL);
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
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
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        licenseNumber: "",
        vehicleType: "",
        rating: 0,
        isAvailable: true,
        latitude: 0,
        longitude: 0,
        city: ""
      });
      setEditingId(null);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (driver) => {
    setFormData(driver);
    setEditingId(driver.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchDrivers();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Driver Admin Panel</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow mb-8">
        {[
          "name",
          "email",
          "password",
          "phoneNumber",
          "licenseNumber",
          "vehicleType",
          "rating",
          "latitude",
          "longitude",
          "city"
        ].map((field) => (
          <input
            key={field}
            type={field === "rating" || field === "latitude" || field === "longitude" ? "number" : "text"}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        ))}
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
          <span>Available</span>
        </label>
        <button type="submit" className="col-span-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Available</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id} className="hover:bg-gray-50">
              <td className="border p-2">{driver.name}</td>
              <td className="border p-2">{driver.email}</td>
              <td className="border p-2">{driver.phoneNumber}</td>
              <td className="border p-2">{driver.city}</td>
              <td className="border p-2">{driver.rating}</td>
              <td className="border p-2">{driver.isAvailable ? "Yes" : "No"}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(driver)} className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Edit</button>
                <button onClick={() => handleDelete(driver.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverManagement;
