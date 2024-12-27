import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaRegBookmark,
  FaDoorOpen,
  FaUsers,
  FaComments,
  FaImages,
  FaCalendarCheck,
  FaTicketAlt,
  FaSearch,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [roomCount, setRoomCount] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [bookingCount, setBookingCount] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingBooking, setPendingBooking] = useState([]);
  

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRoomCount(res.data.result.length);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/")
        .then((res) => {
          setUserCount(res.data.users.length);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          setBookingCount(res.data.List.length);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category/")
        .then((res) => {
          setCategoriesCount(res.data.categories.length);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          const pendingBookings = res.data.List.filter(
            (booking) => booking.status === "Pending"
          );
          setPendingBooking(pendingBookings);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [isLoading]);

  return (
    <div>
      {/* Body Section */}
      <div className="p-5 w-full max-h-[100vh] flex flex-col">
        <div className="w-full h-auto lg:flex lg:flex-row grid grid-cols-2 justify-between gap-4">
          <div className="lg:w-1/4 w-full p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaDoorOpen className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {roomCount}
              </p>
              <p className="text-lg font-medium text-gray-300">Total Rooms</p>
            </div>
          </div>
          <div className="lg:w-1/4 w-full p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaUsers className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {userCount}
              </p>
              <p className="text-lg font-medium text-gray-300">Total Users</p>
            </div>
          </div>
          <div className="lg:w-1/4 w-full p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaCalendarCheck className="text-pink-400 text-6xl mb-2" />
              <p className="text-6xl font-extrabold text-white mb-1">
                {bookingCount}
              </p>
              <p className="text-lg font-medium text-gray-300">
                Total Bookings
              </p>
            </div>
          </div>
          <div className="lg:w-1/4 w-full p-5 h-[200px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg cursor-pointer flex flex-col items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <FaRegBookmark className="text-pink-400 text-6xl mb-2" />
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

      {/* Middle Details */}
      <div className="md:flex hidden flex-row w-full h-[100vh]">
        {/* Booking Details */}
        <div className="mt-6 lg:w-[60%] w-full">
          <p className="mt-5 text-xl font-semibold text-white">New Bookings</p>
          <table className="w-full bg-white mt-5 border border-gray-400 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-black">
                  Booking Id
                </th>
                <th className="p-2 border border-gray-300 text-black">
                  Room Id
                </th>
                <th className="p-2 border border-gray-300 text-black">Email</th>
                <th className="p-2 border border-gray-300 text-black">
                  Check In
                </th>
                <th className="p-2 border border-gray-300 text-black">
                  Check Out
                </th>
                <th className="p-2 border border-gray-300 text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingBooking.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="p-2 border border-gray-300 text-black">
                    {booking.bookingId}
                  </td>
                  <td className="p-2 border border-gray-300 text-black">
                    {booking.roomId}
                  </td>
                  <td className="p-2 border border-gray-300 text-black">
                    {booking.email}
                  </td>
                  <td className="p-2 border border-gray-300 text-black">
                    {new Date(booking.start).toDateString()}
                  </td>
                  <td className="p-2 border border-gray-300 text-black">
                    {new Date(booking.end).toDateString()}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <Link to={"/admin/bookings"}>
                      <button className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-600 w-auto">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
