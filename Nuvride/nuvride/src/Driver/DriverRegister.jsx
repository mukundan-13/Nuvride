import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function DriverRegister() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phoneNumber: '',
    licenseNumber: '', vehicleType: '', city: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8085/api/drivers/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('driverId', res.data.driverId);

      await Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: 'You have registered successfully.',
        confirmButtonColor: '#3085d6'
      });

      navigate('/driver-dashboard');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.message || 'Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded mt-10">
      {["name", "email", "password", "phoneNumber", "licenseNumber", "vehicleType", "city"].map(field => (
        <input key={field} type={field === "password" ? "password" : "text"} name={field}
          value={form[field]} onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 border mb-4 rounded"
          required
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">Register</button>
    </form>
  );
}

export default DriverRegister;
