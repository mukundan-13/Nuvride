import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // Function to fetch user profile
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8085/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (err) {
            setError('Failed to fetch user profile');
        } finally {
            setLoading(false);
        }
    };

    // Function to update user profile
    const updateUserProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8085/user/profile', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.'
            });
        } catch (err) {
            setError('Failed to update user profile');
        }
    };

    // Function to delete user profile
    const deleteUserProfile = async () => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:8085/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Deleted!',
                    text: 'Your profile has been deleted successfully.'
                });
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('storage'));
                navigate("/"); // Redirect to homepage or logout the user
            } catch (err) {
                setError('Failed to delete user profile');
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <form onSubmit={updateUserProfile} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={user.email}
                        disabled
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <button
                    onClick={deleteUserProfile}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
