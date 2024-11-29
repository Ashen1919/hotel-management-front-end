export default function AdminBooking() {
  const sampleData = [
    {
      bookingId: 1001,
      email: "user1@example.com",
      status: "Pending",
      reason: "Conference booking",
      start: "2023-10-01T09:00:00",
      end: "2023-10-01T11:00:00",
      notes: "Need projector",
      timeStamp: "2023-09-25T14:30:00",
    },
    {
      bookingId: 1002,
      email: "user2@example.com",
      status: "Approved",
      reason: "Room reservation",
      start: "2023-10-02T10:00:00",
      end: "2023-10-02T12:00:00",
      notes: "Need whiteboard",
      timeStamp: "2023-09-26T10:15:00",
    },
    {
      bookingId: 1003,
      email: "user3@example.com",
      status: "Rejected",
      reason: "Maintenance",
      start: "2023-10-03T14:00:00",
      end: "2023-10-03T16:00:00",
      notes: "",
      timeStamp: "2023-09-27T09:45:00",
    },
  ];

  return (
    <div className="w-full p-4">
      <table className="w-full text-black text-left bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Booking ID</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Reason</th>
            <th className="p-2 border border-gray-300">Start</th>
            <th className="p-2 border border-gray-300">End</th>
            <th className="p-2 border border-gray-300">Notes</th>
            <th className="p-2 border border-gray-300">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((booking) => {
            return (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300">{booking.bookingId}</td>
                <td className="p-2 border border-gray-300">{booking.email}</td>
                <td className="p-2 border border-gray-300">{booking.status}</td>
                <td className="p-2 border border-gray-300">{booking.reason}</td>
                <td className="p-2 border border-gray-300">{new Date(booking.start).toDateString()}</td>
                <td className="p-2 border border-gray-300">{new Date(booking.end).toDateString()}</td>
                <td className="p-2 border border-gray-300">{booking.notes || "N/A"}</td>
                <td className="p-2 border border-gray-300">{booking.timeStamp}</td>
              </tr>
              
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
