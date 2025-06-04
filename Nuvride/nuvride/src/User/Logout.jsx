import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout', { withCredentials: true });

      // Clear localStorage or token if needed
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.dispatchEvent(new Event('storage'));

      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
