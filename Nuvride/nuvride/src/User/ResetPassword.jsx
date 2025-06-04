import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom'; // To extract the token from the URL

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // Extract token from the URL
  const token = searchParams.get('token'); // Get the 'token' parameter from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Send the new password and token to the backend
      await axios.post('http://localhost:8085/api/auth/reset-password', { token, newPassword: password });
      setMessage('Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Set New Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg w-full mt-4 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Display success or error messages */}
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
