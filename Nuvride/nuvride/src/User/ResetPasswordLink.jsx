import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:8085/api/auth/forgot-password', { email });
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      setError('There was an error sending the reset link. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg w-full mt-4 hover:bg-blue-600"
          >
            Send Reset Link
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

export default ResetPasswordLink;
