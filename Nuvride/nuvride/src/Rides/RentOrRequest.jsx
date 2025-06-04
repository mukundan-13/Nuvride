import React from 'react';
import { Link } from 'react-router-dom';

const RentOrRequest = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 bg-gray-100 space-y-8 md:space-y-0">
            {/* Rent a Car Box */}
            <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/car-image.jpg")' }}></div>
                <div className="relative z-10 text-white p-4 bg-black bg-opacity-50 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Rent a Car</h2>
                    <Link to="/search">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                            Rent Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Request a Ride Box */}
            <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/ride-image.jpg")' }}></div>
                <div className="relative z-10 text-white p-4 bg-black bg-opacity-50 rounded-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Request a Ride</h2>
                    <Link to="/request-ride">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                            Request Ride
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RentOrRequest;
