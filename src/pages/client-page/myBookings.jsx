import { useEffect, useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function MyBookingPage() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplay, setIsDisplay] = useState("");

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
    <div className="w-full h-auto p-5 flex flex-col justify-center items-center">
      {/* Back Button */}
      <button className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex">
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>
      <div className="mt-10 w-full h-auto p-5 flex flex-col justify-center items-center relative">
        <p className="font-bold text-3xl relative left-4 mb-5">Your Bookings</p>
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mr-10 w-full h-auto justify-between">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="ml-5 p-4 justify-between mr-5 w-full h-auto flex flex-col bg-gray-900 rounded-xl"
              >
                <div className="w-full h-auto flex flex-row">
                  <div className="flex flex-col mt-2 space-y-10 w-[50%] text-white font-semibold">
                    <p className="text-red-600 flex flex-row">
                      Booking ID:
                      <p className="text-white ml-3">
                        {booking.bookingId}
                      </p>{" "}
                    </p>
                    <p className="text-red-600 flex flex-row">
                      Room ID:{" "}
                      <p className="text-white ml-3">{booking.roomId}</p>{" "}
                    </p>
                    <p className="text-red-600 flex flex-row">
                      Email <p className="text-white ml-3">{booking.email}</p>{" "}
                    </p>
                  </div>
                  <div className="flex flex-col mt-2 space-y-10 w-[50%] text-white font-semibold">
                    <p className="text-red-600 flex flex-row">
                      Check In Date:{" "}
                      <p className="text-white ml-3">
                        {new Date(booking.start).toDateString()}
                      </p>{" "}
                    </p>
                    <p className="text-red-600 flex flex-row">
                      Check Out Date:{" "}
                      <p className="text-white ml-3">
                        {new Date(booking.end).toDateString()}
                      </p>{" "}
                    </p>
                    <p className="text-red-600 flex flex-row">
                      Status:{" "}
                      {booking.status === "Confirmed" ? (
                        <button
                          type="button"
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        >
                          Confirmed
                        </button>
                      ) : booking.status === "Cancel" ? (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Canceled
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Pending
                        </button>
                      )}{" "}
                    </p>
                  </div>
                </div>
                {booking.status === "Cancel" ? (
                  <>
                    <hr className="text-white font-semibold mt-3 mb-3" />
                    <div className="w-full flex flex-row text-white font-semibold">
                      <p className="text-red-600 flex flex-row">
                        Reason: <p className="text-white ml-3">{booking.reason}</p>{" "}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mr-10 ">
            <Link to={"/booking"}>
              <button className="p-4 items-center rounded-xl bg-blue-600 border-2 border-blue-600 text-white text-xl font-bold transition duration-500 hover:bg-transparent hover:text-black">
                Make a Booking
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
