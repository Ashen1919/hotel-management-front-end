import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BsPeopleFill } from "react-icons/bs";

const DesktopRoomCard = ({
  image,
  price,
  specialNotes,
  maxGuests,
  availability,
  description,
  category,
}) => {
  return (
    <div className="w-full h-[300px] bg-white md:flex md:flex-row hidden rounded-[10px] p-3 cursor-pointer hover:scale-100 hover:shadow-2xl transition duration-500 border-2 border-white hover:border-2 hover:border-amber-400">
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
        <div className="font-bold text-2xl mb-2 text-blue-600">{category}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-red-500 text-base mt-2">{specialNotes}</p>
      </div>

      {/* Right-bar */}
      <div className="px-6 py-2 space-y-10">
        <div className="font-bold text-xl mb-2">{price} / night</div>
        <div className="font-bold text-xl mb-2 text-blue-600">
          Available: {availability}
        </div>
        <div className="flex flex-row gap-3 items-center">
          <BsPeopleFill />
          <p className="text-lg font-semibold text-blue-600">{maxGuests}</p>
        </div>
        {/* Search Button */}
        <div className="flex justify-center md:w-[120px] md:mr-3 md:ml-3 md:flex-col">
          <button className="bg-blue-500 text-white px-5 mt-3 md:mt-0 py-3 md:ml-5 justify-center items-center gap-3 flex rounded-lg w-full hover:bg-blue-600 transition duration-300">
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
    <div className="max-w-sm md:hidden rounded shadow-lg m-4 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group">
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
        <div className="font-bold text-2xl mb-2 text-blue-600">{category}</div>
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2">{price} / night</div>
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

export default function BookingPage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
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
          console.log(error.message);
        });
    }
  }, [roomIsLoading]);

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
      <div className="block w-full h-auto bg-gray-200">
        <div className="w-full pl-5 pr-5" id="booking">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start bg-white shadow-lg p-4 space-y-4 md:space-y-0 border-[7px] border-sky-500">
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between space-y-3 w-full">
              <div className="md:flex md:flex-row w-full">
                {/* Check-in Date */}
                <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 md:gap-7 md:border-r-[7px] md:border-sky-500 md:items-center w-full md:w-1/3">
                  <label className="text-black text-lg font-semibold w-24">
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    className="border-2 border-gray-400 rounded-lg p-2 w-full"
                    placeholderText="Select date"
                  />
                </div>

                {/* Check-out Date */}
                <div className="flex flex-col md:flex-row mt-3 md:mt-0 gap-3 md:gap-7 md:items-center md:border-r-[7px] md:border-sky-500 w-full md:w-1/3 ml-0 md:ml-8">
                  <label className="text-black text-lg font-semibold w-24">
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    className="border-2 border-gray-400 rounded-lg p-2 w-full"
                    placeholderText="Select date"
                  />
                </div>

                {/* Max Guests */}
                <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 md:gap-7 md:items-center w-full md:w-1/3 ml-0 md:ml-8">
                  <label className="text-black text-lg font-semibold w-40">
                    Max Guests
                  </label>
                  <select className="border-2 border-gray-400 rounded-lg p-2 w-full">
                    <option value="">Select</option>
                    {[1, 2, 3, 4].map((maxG) => (
                      <option key={maxG} value={maxG}>
                        {maxG}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center md:w-[120px] md:mr-3 md:ml-3 md:flex-col md:border-l-[7px] md:border-sky-500">
              <button className="bg-blue-500 text-white px-5 mt-3 md:mt-0 py-3 md:ml-5 justify-center items-center gap-3 flex rounded-lg w-full hover:bg-blue-600 transition duration-300">
                <FaSearch className="md:hidden" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-0">
        <button>
          <FiMenu className="text-2xl md:hidden" />
        </button>
      </div>
      <div className="flex flex-row mt-2 w-full h-auto md:pl-5">
        {/* Left sidebar */}
        <div className="md:flex md:flex-col hidden w-[20%] h-[100vh] bg-gray-100 border-r-2 border-gray-400 p-5 "></div>

        {/* Right sidebar */}
        <div className="flex flex-col w-full md:w-[80%] h-[100vh] p-5 bg-gray-100 ml-5 mr-5">
          {/* Right sidebar Desktop navigation */}
          <div className="mt-10 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
            {rooms.map((room) => (
              <DesktopRoomCard
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
          {/* Right sidebar Mobile navigation */}
          <div className="mt-10 grid grid-cols-1 md:hidden gap-4 px-4">
            {rooms.map((room) => (
              <MobileRoomCard
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
        </div>
      </div>
    </div>
  );
}
