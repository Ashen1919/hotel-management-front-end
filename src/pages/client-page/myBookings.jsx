import { useEffect, useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function MyBookingPage() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (token == null) {
    navigate("/login");
  }

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/" + email)
        .then((res) => {
          setBookings(res.data.List);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-auto p-5 flex justify-center items-center">
      {/* Background Layer */}
      <div
        className="absolute inset-0 h-auto bg-cover bg-center bg-black opacity-80 blur-sm"
        style={{
          backgroundImage:
            'url("https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748059d003be2d1b9d5/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin")',
        }}
      ></div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex"
      >
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>
      <table className="w-full text-black text-left bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Booking ID</th>
            <th className="p-2 border border-gray-300">Room ID</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Start</th>
            <th className="p-2 border border-gray-300">End</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            return (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">
                  {booking.bookingId}
                </td>
                <td className="p-2 border border-gray-300">{booking.roomId}</td>
                <td className="p-2 border border-gray-300">{booking.email}</td>
                <td className="p-2 border border-gray-300">{booking.status}</td>
                <td className="p-2 border border-gray-300">
                  {new Date(booking.start).toDateString()}
                </td>
                <td className="p-2 border border-gray-300">
                  {new Date(booking.end).toDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
