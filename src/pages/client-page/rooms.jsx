import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

export default function Rooms() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [rooms, setRooms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/category"
        );
        console.log(response.data);
        setDescription(response.data.categories.description);
        setPrice(response.data.categories.price);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/rooms"
        );
        console.log(response.data);
        setRooms(response.data.result);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rooms.length - visibleCards : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === rooms.length - visibleCards ? 0 : prevIndex + 1
    );
  };

  const RoomCard = ({ image, price, rating, description, maxGuest, category, available }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg border bg-white transition-transform duration-300 transform hover:scale-105">
        <img className="w-full h-48 object-cover" src={image} alt="Room" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">${price} / night</div>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
            <span className="ml-2 text-gray-600">{rating} Stars</span>
          </div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-gray-600 mt-2"><strong>Max Guests:</strong> {maxGuest}</p>
          <p className="text-gray-600 mt-2"><strong>Category:</strong> {category}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center">
            {available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 relative w-full max-w-5xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentIndex / visibleCards) * 100}%)`,
          width: `${(rooms.length / visibleCards) * 100}%`,
        }}
      >
        {rooms.map((room, roomId) => (
          <div
            key={roomId}
            className="flex-none w-1/3 px-2" 
          >
            <RoomCard
              image={room.images[0]} 
              price={room.price}
              rating={room.rating}
              description={room.description}
              maxGuest={room.maxGuest}
              category={room.category}
              available={room.available}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full focus:outline-none"
        onClick={handlePrev}
      >
        &#8249;
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full focus:outline-none"
        onClick={handleNext}
      >
        &#8250;
      </button>
    </div>
  );
}
