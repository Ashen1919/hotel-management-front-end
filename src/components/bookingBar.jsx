import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");

  const handleBooking = () => {
    if (startDate && endDate && category) {
      alert(`Booking confirmed! \nCategory: ${category} \nFrom: ${startDate.toDateString()} \nTo: ${endDate.toDateString()}`);
    } else {
      alert("Please fill in all fields before booking.");
    }
  };

  return (
    <div className="bg-gray-100 py-4">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg p-4 rounded-lg max-w-4xl mx-auto space-y-4 md:space-y-0 md:space-x-4">
        
        {/* Check-in Date */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Check-in</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border rounded-lg p-2 w-40"
            placeholderText="Select date"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Check-out</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border rounded-lg p-2 w-40"
            placeholderText="Select date"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-2 w-40"
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        {/* Book Now Button */}
        <div>
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
