import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VehicleCard from './VehicleCard';
import { CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rating, setRating] = useState('');

  // Initialize startDate and endDate from localStorage or use default values
  const [startDate, setStartDate] = useState(
    dayjs(localStorage.getItem('startDate')) || dayjs()
  );
  const [endDate, setEndDate] = useState(
    dayjs(localStorage.getItem('endDate')) || dayjs()
  );

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching vehicles with startDate:', startDate.format('YYYY-MM-DD'), 'endDate:', endDate.format('YYYY-MM-DD'));
      const response = await axios.get('http://localhost:8085/api/vehicles/available', {
        params: {
          companyName: companyName || undefined,
          sortBy: sortByPrice || undefined,
          capacity: capacity || undefined,
          rating: rating || undefined,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        }
      });
      setVehicles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles. Please try again later.");
    }
    setLoading(false);
  }, [companyName, sortByPrice, capacity, rating, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchVehicles();
    }
  }, [startDate, endDate, fetchVehicles]);

  // Save startDate and endDate to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('startDate', startDate.format('YYYY-MM-DD'));
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('endDate', endDate.format('YYYY-MM-DD'));
  }, [endDate]);

  const handleClearFilters = () => {
    setCompanyName('');
    setSortByPrice('');
    setCapacity('');
    setRating('');
    setStartDate(dayjs()); // Reset startDate to current date
    setEndDate(dayjs()); // Reset endDate to current date
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Explore Our Vehicles</h1>

        <div className="flex gap-4 justify-end mb-6">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={dayjs()} // Restrict to today onwards
            renderInput={(params) => (
              <input
                {...params}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate || dayjs()} // Restrict to today or the selected start date
            renderInput={(params) => (
              <input
                {...params}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>

        <div className="flex gap-12">
          <div className="w-full sm:w-1/3 md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Company Name"
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <select
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value)}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sort by Price</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Capacity</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars & above</option>
                <option value="3">3 Stars & above</option>
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center mb-4">{error}</p>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center w-full">
                    No vehicles found with the selected filters.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default VehicleList;
