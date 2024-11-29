import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";
import { FaBuilding, FaUserFriends } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function HomeAbout() {
  return (
    <div className="w-full flex flex-col md:flex-row mt-16 gap-4 sm:ml-10 md:ml-20">
      {/* Left Side: About Us Details */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="w-full md:w-[55%] flex flex-col px-4 md:px-0"
      >
        <div className="text-3xl font-semibold">
          <span className="text-amber-500">Welcome</span> to Ever Peak Lodge
        </div>
        <div className="text-xl font-semibold flex flex-row items-center mt-2">
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
          <span className="px-3">Your Mountain Escape</span>
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
        </div>
        <div className="mt-4 text-lg text-gray-700">
          <p>
            At Ever Peak Lodge Hotel, we blend modern comfort with timeless
            elegance, offering breathtaking views and personalized hospitality.
            Nestled in nature’s tranquility, our lodge is your perfect retreat
            for relaxation, adventure, and unforgettable experiences. Welcome to
            your home away from home!
          </p>
        </div>
        {/* Cards */}
        <div className="mt-3 flex flex-row gap-4">
          {/* Count of Rooms */}
          <div className="w-[30%] h-[150px] bg-gray-100 border-2 border-amber-500 flex flex-col items-center justify-center relative group hover:bg-amber-300 transition hover:cursor-pointer">
            <FaBuilding className="text-amber-500 text-4xl group-hover:text-amber-700 transition" />
            <span className="mt-2 text-xl font-bold text-gray-700 group-hover:text-gray-900">
              Rooms
            </span>
            <span className="text-lg text-gray-500 font-semibold group-hover:text-gray-700">
              270
            </span>
          </div>

          {/* Count of Staff */}
          <div className="w-[30%] h-[150px] bg-gray-100 border-2 border-amber-500 flex flex-col items-center justify-center relative group hover:bg-amber-300 transition hover:cursor-pointer">
            <FaPeopleGroup className="text-amber-500 text-4xl group-hover:text-amber-700 transition" />
            <span className="mt-2 text-xl font-bold text-gray-700 group-hover:text-gray-900">
              Staff
            </span>
            <span className="text-lg text-gray-500 font-semibold group-hover:text-gray-700">
              250+
            </span>
          </div>

          {/* Count of Clients */}
          <div className="w-[30%] h-[150px] bg-gray-100 border-2 border-amber-500 flex flex-col items-center justify-center relative group hover:bg-amber-300 transition hover:cursor-pointer">
            <FaUserFriends className="text-amber-500 text-4xl group-hover:text-amber-700 transition" />
            <span className="mt-2 text-xl font-bold text-gray-700 group-hover:text-gray-900">
              Clients
            </span>
            <span className="text-lg text-gray-500 font-semibold group-hover:text-gray-700">
              1500+
            </span>
          </div>
        </div>

        <div className="mt-3 md:left-0">
          <a href="/aboutus">
            <button className="p-3 text-white border-2 border-amber-500 bg-amber-500 rounded-l-full rounded-r-full hover:border-amber-500 hover:bg-transparent hover:text-amber-500 hover:transition hover:duration-500">
              Explore More
            </button>
          </a>
        </div>
      </motion.div>

      {/* Right Side: Images Section */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="w-full hidden md:w-[45%] md:flex flex-col md:flex-row gap-3"
      >
        <div className="flex flex-col gap-3">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cc3a0026875e76c8/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
            alt="Mountain View 1"
            className="w-full h-[200px] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cb96000828964c50/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
            alt="Mountain View 2"
            className="w-[80%] h-[180px] object-cover rounded-lg shadow-lg self-end"
          />
        </div>
        <div className="flex flex-col gap-3">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cbb90001184be99c/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
            alt="Mountain View 3"
            className="w-[80%] h-[180px] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cb88001c1b5b1fa6/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
            alt="Mountain View 4"
            className="w-full h-[190px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </motion.div>
    </div>
  );
}
