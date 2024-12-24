import React, { useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import axios from "axios";

const RoomCard = ({
  image,
  price,
  availability,
  specialNotes,
  maxGuests,
  description,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group">
      {/* Image with subtle rotation on hover */}
      <div className="overflow-hidden">
        <img
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt="Room"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className="font-bold text-xl mb-2">${price} / night</div>
          <div className="font-bold text-xl mb-2 flex items-center">
            <IoPersonSharp className="mr-4" />
            <p className="text-blue-700">{maxGuests}</p>
          </div>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="mt-4 flex">
          <p className="text-lg font-semibold text-blue-600">
            Availability: {availability ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-red-500">{specialNotes}</p>
        </div>
      </div>

      {/* Book Now Button with hover effects */}
      <div className="px-6 pt-2 pb-4">
        <a href="#booking">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
            Book Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomIsLoading] = useState(false);

  useEffect(() => {
    if (!roomIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRooms(res.data.result);
          setRoomIsLoading(true);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    }
  }, [roomIsLoading]);

  if (!roomIsLoading) {
    return <div className="justify-center mt-40 ml-40 text-3xl font-semibold">Loading rooms...</div>;
  }
  
  if (rooms.length === 0) {
    return <div className="justify-center mt-40 ml-40 text-3xl font-semibold">No rooms available</div>;
  }  

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.roomId}
          image={Array.isArray(room.photos) ? room.photos[0] : room.photos}
          price={room.price}
          rating={room.rating}
          maxGuests={room.maxGuests}
          description={room.specialDescription}
          availability={room.available}
          specialNotes={room.notes}
        />
      ))}
    </div>
  );
}
