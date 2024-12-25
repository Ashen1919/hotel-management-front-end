import axios from "axios";
import React, { useEffect, useState } from "react";

const RoomCard = ({
  image,
  price,
  availability,
  specialNotes,
  maxGuests,
  description,
}) => {
  return (
    <div className="w-[500px] h-auto bg-gray-300 border-2 border-amber-400 p-7 flex">
      <div className="overflow-hidden w-[30%] h-auto border-r-2 border-gray-600">
        <img
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          src={image || "default-image.jpg"}
          alt="Room"
          loading="lazy"
        />
      </div>
      <div className="w-[30%] h-auto block p-3 border-r-2 border-gray-600">
        <p className="text-xl font-semibold">Description</p>
        <p className="text-gray-700 text-base pb-3 border-b-2 border-gray-500">
          {description}
        </p>
        <div className="mt-2">
          <p className="text-red-500">{specialNotes}</p>
        </div>
      </div>
      <div className="block">
        <div className="font-bold text-xl mb-2">${price} / night</div>
        <div className="font-bold text-xl mb-2 flex items-center">
          <IoPersonSharp className="mr-4" />
          <p className="text-blue-700">{maxGuests}</p>
        </div>
        <div className="mt-4 flex">
          <p className="text-lg font-semibold text-blue-600">
            Availability: {availability ? "Available" : "Not Available"}
          </p>
        </div>
        <div className="px-6 pt-2 pb-4">
          <a href="#booking">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
              Book Now
            </button>
          </a>
        </div>
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
        .then(() => {
          setRooms(res.data.result);
          setRoomIsLoading(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [roomIsLoading]);

  if (roomIsLoading) {
    return (
      <div className="justify-center mt-40 justify-self-center text-3xl text-blue-600 font-semibold">
        Loading rooms...
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="justify-center mt-40 justify-self-center text-3xl text-red-600 font-semibold">
        No rooms available
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.roomId}
          image={
            Array.isArray(room.photos) && room.photos.length > 0
              ? room.photos[0]
              : null
          }
          price={room.price || 0}
          maxGuests={room.maxGuests || 3}
          description={room.specialDescription || room.category || ""}
          availability={room.available}
          specialNotes={room.notes || ""}
        />
      ))}
    </div>
  );
}
