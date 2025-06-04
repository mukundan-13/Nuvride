import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const DateSearch = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) setStartDate(dayjs(storedStartDate));
    if (storedEndDate) setEndDate(dayjs(storedEndDate));
  }, []);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    localStorage.setItem("startDate", startDate.format("YYYY-MM-DD"));
    localStorage.setItem("endDate", endDate.format("YYYY-MM-DD"));

    navigate("/cars");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex items-center justify-center min-h-[90vh] bg-blue-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Search for Available Vehicles
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Select the start and end dates to find vehicles available during your specified time.
          </p>

          <div className="flex flex-col gap-4">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={dayjs()}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || dayjs()}
              renderInput={(params) => <TextField {...params} />}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Search Available Vehicles
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DateSearch;
