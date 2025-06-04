import { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    role: "",
    password: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const apiBase = "http://localhost:8085/api/allusers";

  const fetchUsers = async () => {
    const res = await fetch(apiBase);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingUserId ? "PUT" : "POST";
    const url = editingUserId ? `${apiBase}/${editingUserId}` : apiBase;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      role: "",
      password: "",
    });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel - User Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8 space-y-4">
        <h2 className="text-xl font-semibold">{editingUserId ? "Edit User" : "Add New User"}</h2>
        {["firstName", "lastName", "email", "address", "phoneNumber", "role", "password"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field] || ""}
            onChange={handleChange}
            required={field !== "address"}
            className="w-full p-2 border rounded"
          />
        ))}
        <div className="flex space-x-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingUserId ? "Update" : "Add"}
          </button>
          {editingUserId && (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => {
                setEditingUserId(null);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  address: "",
                  phoneNumber: "",
                  role: "",
                  password: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* User List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 shadow-md rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-sm">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(user)} className="bg-yellow-400 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default UserManagement;