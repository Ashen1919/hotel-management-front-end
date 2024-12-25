import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function BookingPage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

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
          <button><FiMenu className="text-2xl md:hidden"/></button>
      </div>
      <div className="flex flex-row mt-2 w-full h-auto md:pl-5">
        <div className="md:flex md:flex-col hidden w-[20%] h-[100vh] bg-gray-100 border-r-2 border-gray-400 p-5 "></div>
        <div className="flex flex-col w-full md:w-[80%] h-[100vh] bg-gray-100 ml-5 mr-5"></div>
      </div>
    </div>
  );
}
