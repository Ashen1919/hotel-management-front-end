import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminBooking() {
  const [bookings,setBookings] = useState([]);
  const [bookingIsLoading, setBookingIsLoading] = useState(false);

  useEffect(()=>{
    if(!bookingIsLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/booking/")
      .then((res)=>{
        setBookings(res.data.List);
        setBookingIsLoading(true);
      }).catch((err)=>{
        console.log("Failed ti fetch bookings", err.message);
      })
    }

    
  }, [bookingIsLoading])

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
            <th className="p-2 border border-gray-300">Timestamp</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            return (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{booking.bookingId}</td>
                <td className="p-2 border border-gray-300">{booking.roomId}</td>
                <td className="p-2 border border-gray-300">{booking.email}</td>
                <td className="p-2 border border-gray-300">{booking.status}</td>
                <td className="p-2 border border-gray-300">{new Date(booking.start).toDateString()}</td>
                <td className="p-2 border border-gray-300">{new Date(booking.end).toDateString()}</td>
                <td className="p-2 border border-gray-300">{booking.timeStamp}</td>
                <td className="p-2 border border-gray-300">
                <div className="flex space-x-4">
                  <button 
                    className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 w-20 "
                    
                    >
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20"
                    
                  >
                    Reject
                  </button>
                </div>
              </td>
              </tr>
              
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
