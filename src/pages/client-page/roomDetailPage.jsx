import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BsPeopleFill } from "react-icons/bs";
import {
  FaBed,
  FaRegBookmark,
  FaRegCreditCard,
  FaTv,
  FaWifi,
} from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { IoCloseSharp, IoShieldCheckmarkSharp } from "react-icons/io5";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`)
      .then((res) => {
        setRoomDetails(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching room details:", err);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`)
      .then((res) => {
        setAllRooms(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all rooms:", err);
        setLoading(false);
      });
  }, [roomId]);

  if (loading)
    return (
      <div className="justify-center flex items-center text-3xl font-semibold animate-fadeIn">
        Loading room details...
      </div>
    );

  const featuredRooms = allRooms
    .filter(
      (room) => room.category === roomDetails.category && room.roomId !== roomId
    )
    .slice(0, 3);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const handleReserveBtn = (roomId) => {
    if (token == null) {
      window.location.href = "/login";
      return;
    }
    if (!checkInDate.toISOString() && !checkOutDate.toISOString()) {
      toast.error("Please fill check in & check out dates");
      return;
    }

    const bookingDetails = {
      roomId,
      email,
      start: checkInDate.toISOString(),
      end: checkOutDate.toISOString(),
    };
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/booking/",
        bookingDetails,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        navigate("/successPage");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to create booking");
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col w-full h-auto">
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
      {/* room details */}
      <div className="p-10 w-full h-auto bg-gray-100 flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-[70%] w-full h-auto md:pr-10 md:border-r-4 md:border-gray-400">
          <img
            src={
              Array.isArray(roomDetails.photos) && roomDetails.photos.length > 0
                ? roomDetails.photos[0]
                : null
            }
            alt="Room Photo"
            className="rounded-xl cursor-pointer hover:scale-105 transition duration-500"
          />
        </div>
        {/* Right-side */}
        <div className="flex flex-col w-full md:w-[30%] h-auto md:ml-8">
          <p className="text-3xl font-semibold md:mt-0 mt-5 text-blue-600">
            {roomDetails.category}
          </p>
          <div className="mt-5 flex flex-col ">
            <div className="flex flex-row space-x-9 md:space-x-10">
              <div className="gap-3 items-center flex flex-row">
                <BsPeopleFill className="text-xl " />
                <p className="text-xl font-semibold text-green-600">
                  {roomDetails.maxGuests}
                </p>
              </div>
              <div className="gap-3 items-center flex flex-row">
                <FaBed className="text-xl " />
                <p className="text-xl font-semibold text-amber-500">Couchs</p>
              </div>
              <div className="gap-3 items-center flex flex-row">
                <FaWifi className="text-xl " />
                <p className="text-xl font-semibold text-red-500">Wi-fi</p>
              </div>
              <div className="gap-3 items-center flex flex-row">
                <FaTv className="text-xl " />
                <p className="text-xl font-semibold text-gray-500">Tv</p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[17px] ">{roomDetails.specialDescription}</p>
            </div>
            <div className="mt-5">
              <p className="text-[14px] text-red-600">{roomDetails.notes}</p>
            </div>
            <div className="mt-5 flex flex-row">
              <p className="text-lg flex">
                Availability:{" "}
                <p className="text-blue-600 ml-3 font-semibold text-lg">
                  {roomDetails.available ? "Available" : "Not Available"}
                </p>
              </p>
            </div>
            <div className="mt-5 flex flex-row items-center">
              <p className="text-lg flex">
                Price:{" "}
                <p className="text-2xl font-semibold ml-4">
                  $ {roomDetails.price}
                </p>{" "}
              </p>
            </div>
            <div className="mt-5 ml-5 space-y-1 flex flex-col">
              <div className="flex flex-row items-center gap-3">
                <MdOutlinePayments className="text-green-600 text-[18px]" />
                <p className="text-[18px] font-semibold">Secure Payment</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <FaRegCreditCard className="text-green-600 text-[18px]" />
                <p className="text-[18px] font-semibold">
                  No Credit Card Required
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <IoShieldCheckmarkSharp className="text-green-600 text-[18px]" />
                <p className="text-[18px] font-semibold">100% Guarantee</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <RiCustomerService2Fill className="text-green-600 text-[18px]" />
                <p className="text-[18px] font-semibold">
                  24x7 Customer Service
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-row gap-3">
              {/* Check-in Date */}
              <div className="flex flex-col gap-3 mt-3 md:mt-0 w-1/3">
                <label className="text-black text-[16px] font-semibold">
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
                  required
                />
              </div>

              {/* Check-out Date */}
              <div className="flex flex-col gap-3 mt-3 md:mt-0 w-1/3">
                <label className="text-black text-[16px] font-semibold">
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
                  required
                />
              </div>

              {/* Max Guests */}
              <div className="flex flex-col gap-3 mt-3 md:mt-0 w-1/3">
                <label className="text-black text-[16px] font-semibold">
                  Max Guests
                </label>
                <input
                  type="text"
                  name="maxguests"
                  value={roomDetails.maxGuests}
                  id="maxguests"
                  className="border-2 border-gray-400 rounded-lg p-2 w-full"
                  disabled
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                className="p-5 bg-blue-600 text-white rounded-[15px] flex flex-row font-semibold items-center gap-4 hover:bg-blue-800 transition duration-500"
                onClick={() => handleReserveBtn(roomId)}
                disabled={!roomDetails.available}
              >
                <FaRegBookmark className="font-semibold" /> Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rooms */}
      <p className="text-3xl font-bold mt-5 ml-8">Featured Rooms</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {featuredRooms.length > 0 ? (
          featuredRooms.map((room, index) => (
            <div
              key={index}
              className="max-w-sm h-auto mb-8 rounded-lg shadow-lg ml-8 mt-5 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group"
            >
              <div className="overflow-hidden">
                <img
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                  src={room.photos[0]}
                  alt={`${room.category} Image`}
                />
              </div>
              <div className="px-2 py-4">
                <div className="font-bold text-2xl mb-2 text-blue-600">
                  {room.category}
                </div>
                <div className="font-bold text-xl mb-2">
                  ${room.price} / night
                </div>
                <p className="text-gray-700 text-base">
                  {room.specialDescription}
                </p>
              </div>
              <div className="px-3 pt-4 pb-4">
                <Link to={`/roomdetails/${room.roomId}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No featured rooms available.</p>
        )}
      </div>
    </div>
  );
}
