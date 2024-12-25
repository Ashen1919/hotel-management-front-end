import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";

export default function BookingPage() {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMaxGuests, setFilterMaxGuests] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterAvailable, setFilterAvailable] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!roomIsLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRooms(res.data.result);
          setRoomIsLoading(true);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [roomIsLoading]);

  const handleBookNow = (roomId) => {
    console.log("Button clicked");
    console.log("Room Id: ", roomId);
  };

  const DesktopRoomCard = ({
    image,
    price,
    specialNotes,
    maxGuests,
    availability,
    description,
    roomId,
    category,
  }) => {
    return (
      <div className="w-full h-[300px] bg-white md:flex md:flex-row hidden rounded-[10px] p-3 cursor-pointer hover:scale-100 hover:shadow-2xl transition duration-500 border-2 border-gray-300 hover:border-2 hover:border-amber-400">
        {/* Image */}
        <div className="overflow-hidden w-1/3 p-3 border-r-2 border-gray-400">
          <img
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
            src={image}
            alt="Room"
          />
        </div>

        {/* Content */}
        <div className="px-6 py-2 w-1/2 border-r-2 border-gray-400">
          <div className="font-bold text-2xl mb-2 text-blue-600">
            {category}
          </div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-red-500 text-base mt-2">{specialNotes}</p>
        </div>

        {/* Right-bar */}
        <div className="px-6 py-2 space-y-10">
          <div className="font-bold text-xl mb-2">$ {price} / night</div>
          <div className="font-bold text-xl mb-2 text-blue-600">
            Available: {availability}
          </div>
          <div className="flex flex-row gap-3 items-center">
            <BsPeopleFill />
            <p className="text-lg font-semibold text-blue-600">{maxGuests}</p>
          </div>
          {/* Search Button */}
          <div className="flex justify-center md:w-[120px] md:mr-3 md:ml-3 md:flex-col">
            <button
              className="bg-blue-500 text-white px-5 mt-3 md:mt-0 py-3 md:ml-5 justify-center items-center gap-3 flex rounded-lg w-full hover:bg-blue-600 transition duration-300"
              onClick={handleBookNow(roomId)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  const MobileRoomCard = ({
    image,
    price,
    specialNotes,
    maxGuests,
    availability,
    description,
    category,
  }) => {
    return (
      <div className="max-w-md md:hidden rounded shadow-lg m-4 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group">
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
          <div className="font-bold text-2xl mb-2 text-blue-600">
            {category}
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-xl mb-2">$ {price} / night</div>
            <div className="flex flex-row gap-3 items-center">
              <BsPeopleFill />
              <p className="text-lg font-semibold text-blue-600">{maxGuests}</p>
            </div>
          </div>
          <p className="text-gray-700 text-base">{description}</p>
          <div className="font-bold text-xl mt-2 mb-2 text-blue-600">
            Available: {availability}
          </div>
          <p className="text-red-500 text-base mt-2">{specialNotes}</p>
        </div>

        {/* Book Now Button with hover effects */}
        <div className="px-6 pt-4 pb-4">
          <a href="/booking">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
              Book Now
            </button>
          </a>
        </div>
      </div>
    );
  };

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterMaxGuests("All");
    setFilterPrice("All");
    setFilterAvailable("All");
  };

  // Filtering logic
  const filteredRooms = rooms.filter((room) => {
    const matchesCategory =
      filterCategory === "All" || room.category === filterCategory;

    const matchesMaxGuests =
      filterMaxGuests === "All" || room.maxGuests === parseInt(filterMaxGuests);

    const matchesPrice =
      filterPrice === "All" || room.price === parseInt(filterPrice);

    const matchesAvailability =
      filterAvailable === "All" ||
      (filterAvailable === "Available" && room.available === true) ||
      (filterAvailable === "Not Available" && room.available === false);

    const matchesSearchQuery = searchQuery
      ? room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return (
      matchesCategory &&
      matchesMaxGuests &&
      matchesPrice &&
      matchesSearchQuery &&
      matchesAvailability
    );
  });

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
      <div className="p-3 md:p-0">
        <button>
          <FiMenu className="text-2xl md:hidden" />
        </button>
      </div>
      <div className="flex flex-row mt-2 w-full h-auto md:pl-5">
        {/* Left sidebar */}
        <div className="md:flex md:flex-col hidden w-[20%] h-auto bg-gray-100 border-r-2 border-gray-400 p-5 ">
          {/* Sort by category */}
          <div className="flex flex-col">
            {/* Search Bar */}
            <div className="mt-5 mb-3">
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Sort by Category */}
            <p className="text-lg font-bold">Categories</p>
            <div className="flex flex-col space-y-4 mt-3 ml-5">
              {["All", "Standard Room", "Deluxe Room", "Luxury"].map(
                (category, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      className="cursor-pointer"
                      onChange={(e) => setFilterCategory(e.target.value)}
                      checked={filterCategory === category}
                    />
                    <span>{category}</span>
                  </label>
                )
              )}
            </div>

            {/* Sort by Availability */}
            <p className="text-lg font-bold mt-7">Price</p>
            <div className="flex flex-col space-y-4 mt-3 ml-5">
              {["All", "Available", "Not Available"].map((available, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="available"
                    value={available}
                    className="cursor-pointer"
                    onChange={(e) => setFilterAvailable(e.target.value)}
                    checked={filterAvailable === available}
                  />
                  <span>{available}</span>
                </label>
              ))}
            </div>

            {/* Sort by Max Guests */}
            <p className="text-lg font-bold mt-7">Max Guests</p>
            <div className="flex flex-col space-y-4 mt-3 ml-5">
              {["All", "1", "2", "3", "4"].map((maxGuest, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="maxGuests"
                    value={maxGuest}
                    className="cursor-pointer"
                    onChange={(e) => setFilterMaxGuests(e.target.value)}
                    checked={filterMaxGuests === maxGuest}
                  />
                  <span>
                    {maxGuest} Person{maxGuest > 1 && "s"}
                  </span>
                </label>
              ))}
            </div>

            {/* Sort by Price */}
            <p className="text-lg font-bold mt-7">Price</p>
            <div className="flex flex-col space-y-4 mt-3 ml-5">
              {["All", "100", "125", "175"].map((price, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="price"
                    value={price}
                    className="cursor-pointer"
                    onChange={(e) => setFilterPrice(e.target.value)}
                    checked={filterPrice === price}
                  />
                  <span>${price}</span>
                </label>
              ))}
            </div>

            {/* Clear radio buttons */}
            <div className="mt-5">
              <button
                onClick={clearFilters}
                className="mt-5 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col w-full md:w-[80%] h-auto p-5 bg-gray-100 ml-5 mr-5">
          {/* Right sidebar Desktop navigation */}
          <div className="mt-4 hidden md:grid md:grid-cols-1 gap-3 px-4">
            {filteredRooms.map((room) => (
              <DesktopRoomCard
                key={room.roomId}
                category={room.category}
                image={
                  Array.isArray(room.photos) && room.photos.length > 0
                    ? room.photos[0]
                    : null
                }
                price={room.price || 0}
                maxGuests={room.maxGuests || 3}
                description={room.specialDescription || ""}
                availability={room.available ? "Yes" : "No"}
                specialNotes={room.notes || ""}
              />
            ))}
          </div>
          {/* Right sidebar Mobile navigation */}
          <div className="mt-4 grid grid-cols-1 md:hidden gap-4 px-1">
            {filteredRooms.map((room) => (
              <MobileRoomCard
                key={room.roomId}
                category={room.category}
                image={
                  Array.isArray(room.photos) && room.photos.length > 0
                    ? room.photos[0]
                    : null
                }
                price={room.price || 0}
                maxGuests={room.maxGuests || 3}
                description={room.specialDescription || ""}
                availability={room.available ? "Yes" : "No"}
                specialNotes={room.notes || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
