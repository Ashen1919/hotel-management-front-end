import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function RoomsPage() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [rooms, setRooms] = useState([]);
  const [roomsIsLoaded, setRoomsIsLoaded] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsIsLoaded, setBookingsIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!roomsIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRooms(res.data.result || []);
          setRoomsIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load rooms:", err);
        });
    }

    if (!bookingsIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          setBookings(res.data.List || []);
          setBookingsIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load bookings:", err);
        });
    }
  }, [roomsIsLoaded, bookingsIsLoaded]);

  const getRoomAvailability = (roomId) => {
    const currentDate = new Date();

    const isBooked = bookings.some(
      (booking) =>
        booking.roomId === roomId &&
        new Date(booking.checkOutDate) < currentDate &&
        booking.status === "Confirmed"
    );

    return !isBooked; 
  };

  function deleteRoom(roomId) {
    if (window.confirm("Are you sure you want to delete room ID: " + roomId + "?")) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          toast.success("Room deleted successfully");
          setRoomsIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to delete room");
          console.error(err);
        });
    }
  }

  function handlePlusClick() {
    navigate("/admin/add-room");
  }

  return (
    <div className="p-4 w-full text-black">
      <button
        className="w-[60px] h-[60px] bg-red-600 rounded-full justify-center items-center flex text-2xl bottom-5 right-5 fixed"
        onClick={handlePlusClick}
      >
        <FaPlus color="white" />
      </button>
      <table className="w-full bg-white border border-gray-400 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300 text-black">Room ID</th>
            <th className="p-2 border border-gray-300 text-black">Category</th>
            <th className="p-2 border border-gray-300 text-black">Max Guests</th>
            <th className="p-2 border border-gray-300 text-black">Available</th>
            <th className="p-2 border border-gray-300 text-black">Price($)</th>
            <th className="p-2 border border-gray-300 text-black">Photos</th>
            <th className="p-2 border border-gray-300 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300 text-black">{room.roomId}</td>
              <td className="p-2 border border-gray-300 text-black">{room.category}</td>
              <td className="p-2 border border-gray-300 text-black">{room.maxGuests}</td>
              <td className="p-2 border border-gray-300 text-black">
                {getRoomAvailability(room.roomId) ? "Yes" : "No"}
              </td>
              <td className="p-2 border border-gray-300 text-black">{room.price}</td>
              <td className="p-2 border border-gray-300 text-black">
                {room.photos.length > 0 ? (
                  <img
                    src={room.photos[0]}
                    alt="Room"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border border-gray-300">
                <Link
                  to={`/admin/update-room`}
                  className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 inline-flex items-center space-x-1 mr-2"
                  state={room}
                >
                  <FaEdit />
                </Link>
                <button
                  className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600"
                  onClick={() => deleteRoom(room.roomId)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
