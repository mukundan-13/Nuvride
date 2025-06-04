import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8085/api/driver/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('driverId', res.data.driverId);

      Swal.fire('Success!', 'Login successful', 'success').then(() => {
        navigate('/driver-dashboard');
      });
    } catch (err) {
      Swal.fire('Login Failed', 'Invalid email or password', 'error');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        className="w-full p-2 border mb-4 rounded" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
        className="w-full p-2 border mb-4 rounded" required />
      <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">Login</button>
    </form>
  );
}

export default DriverLogin;
