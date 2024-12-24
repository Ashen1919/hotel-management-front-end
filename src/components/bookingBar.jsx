import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";

export default function BookingBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxGuest, setMaxGuest] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!startDate || !endDate || !maxGuest) {
      alert("Please select all fields.");
      return;
    }

    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      maxGuest,
    }).toString();

    navigate(`/AllRooms?${queryParams}`);
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="my-3 py-4 w-[350px] md:w-[800px] lg:w-[800px]"
      id="booking"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-center bg-white shadow-lg p-4 rounded-lg space-y-4 md:space-y-0 md:space-x-4 border-4 border-sky-500 md:rounded-l-full md:rounded-r-full">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-start md:gap-4 space-y-3">
          <div className="md:flex md:flex-row md:gap-3 relative">
            {/* Check-in Date */}
            <div className="flex flex-col">
              <label className="text-black mb-1">Check-in</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border-2 border-gray-400 rounded-lg p-2 w-full md:w-40"
                placeholderText="Select date"
              />
            </div>

            {/* Check-out Date */}
            <div className="flex flex-col">
              <label className="text-black mb-1">Check-out</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="border-2 border-gray-400 rounded-lg p-2 w-full md:w-40"
                placeholderText="Select date"
              />
            </div>

            {/* Max Guests */}
            <div className="flex flex-col">
              <label className="text-black mb-1">Max Guests</label>
              <select
                value={maxGuest}
                onChange={(e) => setMaxGuest(e.target.value)}
                className="border-2 border-gray-400 rounded-lg p-2 w-full md:w-40"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4].map((maxG) => (
                  <option key={maxG} value={maxG}>
                    {maxG}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center md:flex-col">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-5 mt-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
}
