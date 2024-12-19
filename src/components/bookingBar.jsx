import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";
import { Link } from "react-router-dom";

export default function BookingBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/category"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="my-3 py-4 w-[350px] md:w-[800px] lg:w-[850px]"
      id="booking"
    >
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-lg p-4 rounded-lg space-y-4 md:space-y-0 md:space-x-8 border-4 border-sky-500 md:rounded-l-full md:rounded-r-full">
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

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-black mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-400 rounded-lg p-2 w-52 md:w-40"
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Book Now Button */}
        <div>
          <Link to={"/"}>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex hover:bg-blue-600 transition duration-300">
              Search
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
