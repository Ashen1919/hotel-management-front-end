import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`)
      .then((res) => {
        setRoomDetails(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching room details:", err);
      });
  }, [roomId]);

  if (!roomDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="block">
      <div className="w-full h-[250px] bg-gray-800 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6758fe3b003409d50e55/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin")',
          }}
        ></div>
        <div className="relative z-10 flex p-5">
          <a href="/">
            <p className="text-2xl pl-0 md:pl-10 font-semibold text-amber-400">
              EverPeak Lodge
            </p>
            <p className="text-4xl font-bold md:pl-10 pl-0 text-white mt-5">
              Escape to Comfort: Your Journey Begins Here
            </p>
            <p className="text-lg text-white font-medium mt-5 md:pl-10 pl-0 md:block hidden">
              Discover the perfect blend of luxury and relaxation. Book your
              stay effortlessly and unlock unforgettable experiences at our
              exquisite hotel.
            </p>
          </a>
        </div>
      </div>
      <div className="room-details-container">
        <h1>{roomDetails.name}</h1>
        <p>{roomDetails.description}</p>
        <p>Price: ${roomDetails.price}</p>
        <p>Max Guests: {roomDetails.maxGuests}</p>
        <p>{roomDetails.available ? "Available" : "Not Available"}</p>
      </div>
    </div>
  );
}
