import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const RoomCard = ({ image, price, rating, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group">
      {/* Image with subtle rotation on hover */}
      <div className="overflow-hidden">
        <img
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt="Room"
        />
      </div>

      {/* Content */}
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
      </div>

      {/* Explore More Link */}
      <div className="text-blue-600 ml-6 flex">
        <a
          href="/rooms-list"
          className="flex items-center hover:underline hover:transition-transform hover:scale-105 duration-300"
        >
          Explore More <IoIosArrowForward />
        </a>
      </div>

      {/* Book Now Button with hover effects */}
      <div className="px-6 pt-4 pb-4">
        <a href="#booking">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
            Book Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default function Rooms() {
  const roomData = [
    {
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674a8709003c52e7e8f2/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
      price: 100,
      rating: 4,
      description:
        "The Standard Rooms at Ever Peak Hotel offer a cozy and comfortable stay, featuring modern amenities, a relaxing ambiance, and beautiful views, perfect for both business and leisure travelers seeking convenience and comfort.",
    },
    {
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674a1d310020f10535ec/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
      price: 125,
      rating: 5,
      description:
        "Experience luxury in our Deluxe Rooms at Ever Peak Hotel, featuring elegant, plush bedding, stunning views, modern amenities, and personalized service for unmatched comfort.",
    },
    {
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674a89a10016b66f45c7/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
      price: 175,
      rating: 4.5,
      description:
        "Experience unparalleled luxury in Ever Peak Hotel's rooms, featuring elegant décor, premium amenities, breathtaking views, personalized service, and ultimate comfort for a memorable stay.",
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {roomData.map((room, index) => (
        <RoomCard
          key={index}
          image={room.image}
          price={room.price}
          rating={room.rating}
          description={room.description}
        />
      ))}
    </div>
  );
}
