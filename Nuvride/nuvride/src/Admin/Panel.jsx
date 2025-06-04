import { useNavigate } from 'react-router-dom';

function Panel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any tokens or session if added later
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Vehicles</h2>
            <p className="text-gray-500 mb-4">Add, edit, and delete vehicles.</p>
            <button
              onClick={() => navigate('/vehiclemanage')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Manage Vehicles
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Bookings</h2>
            <p className="text-gray-500 mb-4">View and manage all bookings.</p>
            <button
              onClick={() => navigate('/bookingsmanage')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Manage Bookings
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Users</h2>
            <p className="text-gray-500 mb-4">Handle user information and access.</p>
            <button
              onClick={() => navigate('/usermanagement')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Manage Users
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Drivers</h2>
            <p className="text-gray-500 mb-4">Assign and manage driver details.</p>
            <button
              onClick={() => navigate('/drivermanagement')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Manage Drivers
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Rides</h2>
            <p className="text-gray-500 mb-4">Monitor and manage active rides.</p>
            <button
              onClick={() => navigate('/ridemanagement')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Manage Rides
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Panel;
