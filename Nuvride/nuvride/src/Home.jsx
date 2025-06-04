import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Welcome to NuvRide!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
                Your go-to platform for all your rental needs.
            </p>
            <Link to="/rent-or-request">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                    Get Started
                </button>
            </Link>
        </div>
    );
};

export default Home;
