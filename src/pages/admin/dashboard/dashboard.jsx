import axios from "axios";
import React, { useEffect, useState } from "react";

import { FaDoorOpen } from "react-icons/fa";

export default function Dashboard() {
  const [roomCount, setRoomCount] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [bookingCount, setBookingCount] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState([]);
  const [CountIsLoading, setCountIsLoading] = useState(false);

  useEffect(() => {
    if (!CountIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRoomCount(res.data.result.length);
          setCountIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/")
        .then((res) => {
          setUserCount(res.data.users.length);
          setCountIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          setBookingCount(res.data.List.length);
          setCountIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category/")
        .then((res) => {
          setCategoriesCount(res.data.categories.length);
          setCountIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [CountIsLoading]);

  return (
    <div>
      {/* Body Section */}
      <div className="p-5 w-full max-h-[100vh] flex flex-col">
        <div className="w-full h-auto flex flex-row justify-between gap-4">
          <div className="w-1/4 p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaDoorOpen className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {roomCount}
              </p>
              <p className="text-lg font-medium text-gray-300">Total Rooms</p>
            </div>
          </div>
          <div className="w-1/4 p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaDoorOpen className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {userCount}
              </p>
              <p className="text-lg font-medium text-gray-300">Total Users</p>
            </div>
          </div>
          <div className="w-1/4 p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaDoorOpen className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {bookingCount}
              </p>
              <p className="text-lg font-medium text-gray-300">
                Total Bookings
              </p>
            </div>
          </div>
          <div className="w-1/4 p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaDoorOpen className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {categoriesCount}
              </p>
              <p className="text-lg font-medium text-gray-300">
                Total Categories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
