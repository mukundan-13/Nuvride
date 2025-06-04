import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const VehicleManagementPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    companyName: "",
    numberPlate: "",
    model: "",
    type: "",
    capacity: "",
    pricePerDay: "",
    manufacturingYear: "",
    rating: "",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleAddVehicle = async () => {
    // Check for empty or null fields
    const hasEmptyField = Object.values(newVehicle).some(
      (value) => value === null || value.trim() === ""
    );

    if (hasEmptyField) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the required fields before adding the vehicle.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVehicle),
      });

      if (response.ok) {
        fetchVehicles();
        clearForm();
      } else {
        console.error("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleUpdateVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/vehicles/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVehicle),
      });

      if (response.ok) {
        fetchVehicles();
        clearForm();
        setIsEditing(false);
        setEditId(null);
      } else {
        console.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setNewVehicle(vehicle);
    setIsEditing(true);
    setEditId(vehicle.id);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const response = await fetch(`http://localhost:8085/api/vehicles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchVehicles();
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const clearForm = () => {
    setNewVehicle({
      companyName: "",
      numberPlate: "",
      model: "",
      type: "",
      capacity: "",
      pricePerDay: "",
      manufacturingYear: "",
      rating: "",
      imageUrl: "",
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Vehicles</h2>

      {/* Vehicle Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(newVehicle).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="p-2 border border-gray-300 rounded"
            value={newVehicle[field]}
            onChange={(e) =>
              setNewVehicle({ ...newVehicle, [field]: e.target.value })
            }
          />
        ))}
        <button
          onClick={isEditing ? handleUpdateVehicle : handleAddVehicle}
          className="py-2 px-4 bg-blue-600 text-white rounded col-span-1 sm:col-span-2"
        >
          {isEditing ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </div>

      {/* Vehicle List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Vehicle List</h3>
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="flex justify-between mb-4 border-b pb-2">
              <span>
                {vehicle.companyName} - {vehicle.model} ({vehicle.numberPlate})
              </span>
              <div>
                <button
                  onClick={() => handleEditVehicle(vehicle)}
                  className="text-blue-500 mr-4 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteVehicle(vehicle.id)}
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

export default VehicleManagementPage;
