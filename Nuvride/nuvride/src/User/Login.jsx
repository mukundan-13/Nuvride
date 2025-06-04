import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8085/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data);
            window.dispatchEvent(new Event('storage'));

            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8085/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem('userId', res.data.id);
            window.dispatchEvent(new Event('storage'));

            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                showConfirmButton: false,
                timer: 1500,
            });

            navigate('/dashboard');
            setEmail('');
            setPassword('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error logging in',
                text: 'Invalid email or password. Please try again.',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">LOGIN</h2>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>

                <div className="text-center mt-2">
                    <Link to="/reset-link" className="text-blue-500 hover:underline text-sm">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
