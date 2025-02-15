import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [bookingIsLoading, setBookingIsLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [notes, setNotes] = useState("The room is booked");
  const [showPopup, setShowPopup] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState(null);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
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
          console.log("Failed to fetch bookings", err.message);
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/booking/${bookingId}/${roomId}`,
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
        setStatus("Confirmed");

        const roomInfo = {
          available,
          notes,
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
            setNotes("");
            setReason("");
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
    console.log(bookingId);
  };

  const handleClose = () => {
    setShowPopup(false);
    setActiveBookingId(null);
  };

  const activeBooking = bookings.find(
    (booking) => booking.bookingId === activeBookingId
  );
  const isConfirmed = activeBooking?.status === "Confirmed";

  const handleCancelBooking = (bookingId, newReason) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!newReason) {
      toast.error("Please give a reason");
      return;
    }

    console.log("Reason: ", newReason);
    console.log("Booking Id: ", bookingId);

    const cancelInfo = {
      reason: newReason,
      status: "Cancel",
    };
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/booking/" + bookingId,
        cancelInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Booking canceled successfully.");
        setShowPopup(false);
        setBookingIsLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to cancel booking");
        console.log(err.message);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();

      bookings.forEach((booking) => {
        const checkoutDate = new Date(booking.end);
        if (currentDate > checkoutDate && booking.status === "Confirmed") {
          const token = localStorage.getItem("token");
          if (token) {
            axios
              .put(
                `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${booking.roomId}`,
                { available: true, notes: "" },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(() => {
                toast.success(`Room ${booking.roomId} is now available.`);
                setBookingIsLoading(false); 
              })
              .catch((err) => {
                console.error("Failed to update room availability:", err.message);
              });
          }
        }
      });
    }, 60000); 

    return () => clearInterval(interval); 
  }, [bookings]);

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
                      onClick={() => handleCancel(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Popup Page */}
      {showPopup && (
        <div className="w-full h-[100vh] justify-center items-center flex text-black flex-col bg-gray-800 bg-opacity-40 fixed top-0 left-0 z-50 transition-opacity duration-300 ease-in-out">
          <div className="w-[500px] h-auto p-5 rounded-lg bg-gray-200 flex flex-col opacity-100 transition-transform duration-300 ease-in-out transform scale-100">
            <button
              className="mb-3 flex ml-auto border-2 border-gray-400"
              onClick={handleClose}
            >
              <IoCloseSharp className="text-2xl flex" />
            </button>
            <p className="mt-2 mb-2 text-xl font-semibold">Enter Reason: </p>
            <textarea
              name="reason"
              id="reason"
              placeholder="Enter reason here"
              onChange={(e) => setReason(e.target.value)}
              required
              className="p-5 w-full rounded-lg outline-none transition duration-500 focus:border-2 focus:border-blue-600"
            ></textarea>
            <button
              className={`p-3 ${
                isConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"
              } text-white rounded-[10px] mt-5 w-[150px] transition-opacity duration-300`}
              onClick={() => handleCancelBooking(activeBookingId, reason)}
              disabled={isConfirmed}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
