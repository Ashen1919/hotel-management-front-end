import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [bookingIsLoading, setBookingIsLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
        .then((res) => {
          setBookings(res.data.List);
          setBookingIsLoading(true);
        })
        .catch((err) => {
          console.log("Failed ti fetch bookings", err.message);
        });
    }
  }, [bookingIsLoading]);

  const handleConfirm = (bookingId, roomId) => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/${bookingId}/${roomId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("The Room is confirmed");
        console.log(res);

        const roomInfo = {
          available,
        };
        axios
          .put(
            import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId,
            roomInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            toast.success("Room availability updated");
            console.log(res);
            setAvailable(true);
          })
          .catch((err) => {
            toast.error("Failed to update room availability");
            console.log(err.message);
          });
      })
      .catch((err) => {
        toast.error("Failed to confirm booking");
        console.log(err.message);
      });
  };

  const handleCancel = (bookingId) => {
    setActiveBookingId(bookingId);
    setShowPopup(true);
  };
  
  const handleClose = () => {
    setShowPopup(false);
    setActiveBookingId(null);
  };

  const handleCancelBooking = (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Booking canceled successfully.");
      })
      .catch((err) => {
        toast.error("Failed to cancel booking");
        console.log(err.message);
      });
  };
  

  return (
    <div className="w-full p-4">
      <table className="w-full text-black text-left bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Booking ID</th>
            <th className="p-2 border border-gray-300">Room ID</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Start</th>
            <th className="p-2 border border-gray-300">End</th>
            <th className="p-2 border border-gray-300">Reason</th>
            <th className="p-2 border border-gray-300">Timestamp</th>
            <th className="p-2 border border-gray-300">Action</th>
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
                <td className="p-2 border border-gray-300">{booking.reason}</td>
                <td className="p-2 border border-gray-300">
                  {booking.timeStamp}
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex space-x-4">
                    <button
                      className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 w-20 "
                      onClick={() =>
                        handleConfirm(booking.bookingId, booking.roomId)
                      }
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Popup Page */}
                  {showPopup && (
                    <div className="w-full h-[100vh] justify-center items-center flex text-black flex-col">
                      <div className="w-[500px] h-auto p-5 rounded-lg bg-gray-200 flex flex-col">
                        <button
                          className="mb-3 flex ml-[430px]  border-2 border-gray-400"
                          onClick={() => handleClose()}
                        >
                          <IoCloseSharp className="text-2xl flex" />
                        </button>
                        <textarea
                          name="reason"
                          id="reason"
                          placeholder="Enter reason here"
                          className="p-5 w-full rounded-lg outline-none transition duration-500 focus:border-2 focus:border-blue-600"
                        ></textarea>
                        <button
                          className="p-3 bg-red-600 text-white rounded-[10px] mt-5 w-[150px]"
                          onClick={() => handleCancelBooking(booking.bookingId)}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
